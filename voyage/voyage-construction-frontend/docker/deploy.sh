#!/usr/bin/env bash

set -xeo pipefail

# more bash-friendly output for jq
JQ="jq --raw-output --exit-status"

###################
# AVAILABLE VARS  #
###################
# AWS_ACCOUNT_ID
# AWS_REGION

###################
#   FIXED VARS    #
###################
PROJECT_NAME="v3traffic"
FAMILY="$PROJECT_NAME"
SERVICE_NAME="traffic"
BUILD_ID="$CIRCLE_BUILD_NUM"

if [[ $CIRCLE_BRANCH == "develop" ]]; then
    AWS_REGION="us-west-2"
    ENV="staging"
    FAMILY=$FAMILY"_staging"
    LOG_GROUP="$ENV-$PROJECT_NAME"
    CLUSTER="v3-staging"
elif [[ $CIRCLE_TAG == "master."* ]]; then
    CIRCLE_BRANCH="master"
    AWS_REGION="us-west-2"
    ENV="production"
    FAMILY=$FAMILY"_production"
    LOG_GROUP="$ENV-$PROJECT_NAME"
    CLUSTER="v3-master"
fi

get_env(){
 aws ssm get-parameters --names $CIRCLE_BRANCH.$PROJECT_NAME."$1" \
          --with-decryption --region $AWS_REGION --output json | \
          $JQ '.Parameters[].Value'
}

CPU_SHARES=$(get_env "cpu_shares")
MEM_SHARES=$(get_env "mem_shares")
CONTAINER_PORT=$(get_env "container_port")
BASE_URL=$(get_env "base_url")

make_task_def() {
	echo '[
	  {
	    "name": "'$SERVICE_NAME'",
	    "image": "'"$AWS_ACCOUNT_ID"'.dkr.ecr.'"$AWS_REGION"'.amazonaws.com/'"$PROJECT_NAME"':'"$CIRCLE_BRANCH"'-'"$BUILD_ID"'",
	    "essential": true,
	    "memoryReservation": '"$MEM_SHARES"',
	    "cpu": '"$CPU_SHARES"',
	    "portMappings":
	    [
	      {
	        "containerPort": '"$CONTAINER_PORT"'
	      }
	    ],
	    "environment":
	    [
	      {
	        "name": "ENV",
	        "value": "'"$CIRCLE_BRANCH"'"
	      },
	      {
	        "name": "REACT_APP_DEVELOPMENT_BASE_URL",
	        "value": "'"$BASE_URL"'"
	      }
	    ],
	    "logConfiguration":
	    {
	      "logDriver": "awslogs",
	      "options":
	      {
	        "awslogs-group": "'$LOG_GROUP'",
	        "awslogs-region": "'$AWS_REGION'",
	        "awslogs-stream-prefix": "'$PROJECT_NAME'"
	      }
	    }
	  }
	]'
}

configure_aws_cli(){
	aws --version
	aws configure set default.region $AWS_REGION
	aws configure set default.output json
}

push_ecr_image(){
	aws ecr get-login-password --region $AWS_REGION | docker login \
    --username AWS \
    --password-stdin "$AWS_ACCOUNT_ID".dkr.ecr.$AWS_REGION.amazonaws.com
	docker load -i  workspace/traffic_latest.tar.gz
	docker tag "$AWS_ACCOUNT_ID".dkr.ecr.$AWS_REGION.amazonaws.com/$PROJECT_NAME:$CIRCLE_BRANCH "$AWS_ACCOUNT_ID".dkr.ecr.$AWS_REGION.amazonaws.com/$PROJECT_NAME:$CIRCLE_BRANCH-"$CIRCLE_BUILD_NUM"
	docker push "$AWS_ACCOUNT_ID".dkr.ecr.$AWS_REGION.amazonaws.com/$PROJECT_NAME:$CIRCLE_BRANCH-"$CIRCLE_BUILD_NUM"
}

register_definition() {
  task_def=$(make_task_def)
	echo "$task_def"
	echo "Task definition created"
  if revision=$(aws ecs register-task-definition --container-definitions "$task_def" --family "$FAMILY" | \
                  $JQ '.taskDefinition.taskDefinitionArn'); then
    echo "Revision: $revision"
  else
    echo "Failed to register task definition"
    return 1
  fi
}

deploy_cluster() {
  if [[ $(aws ecs update-service --cluster "$CLUSTER" --service $SERVICE_NAME --task-definition "$revision" | \
                   $JQ '.service.taskDefinition') != "$revision" ]]; then
        echo "Error updating service."
        return 1
    fi
		echo "Deployed!"
		return 0
}

configure_aws_cli
push_ecr_image
register_definition
deploy_cluster
