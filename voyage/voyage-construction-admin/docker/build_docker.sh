#!/bin/bash

set -xeo pipefail

# more bash-friendly output for jq
JQ="jq --raw-output --exit-status"

get_env(){
 aws ssm get-parameters --names $SSM_PARAMATER_PREFIX.$PROJECT_NAME."$1" \
          --with-decryption --region $AWS_REGION --output json | \
          $JQ '.Parameters[].Value'
}

if [[ $CIRCLE_BRANCH == "develop" ]]; then
    PROJECT_NAME="admin"
    AWS_REGION="us-west-2"
    CLUSTER="v3-staging"
    SSM_PARAMATER_PREFIX="$CLUSTER"
elif [[ $CIRCLE_TAG == "master."* ]]; then
    AWS_REGION="us-west-2"
    CIRCLE_BRANCH="master"
else
    # develop as default
    PROJECT_NAME="admin"
    AWS_REGION="us-west-2"
    CLUSTER="v3-staging"
    SSM_PARAMATER_PREFIX="$CLUSTER"
fi

REACT_APP_AUTH_API_URL=$(get_env "REACT_APP_AUTH_API_URL")
REACT_APP_REST_API_URL=$(get_env "REACT_APP_REST_API_URL")
REACT_APP_GOOGLE_API_KEY=$(get_env "REACT_APP_GOOGLE_API_KEY")
REACT_APP_BASE_URL=$(get_env "REACT_APP_BASE_URL")

mkdir -p workspace
docker build -t $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/v3admin:$CIRCLE_BRANCH-$CIRCLE_BUILD_NUM \
--build-arg REACT_APP_REST_API_URL="$REACT_APP_REST_API_URL" \
--build-arg REACT_APP_AUTH_API_URL="$REACT_APP_AUTH_API_URL" \
--build-arg REACT_APP_GOOGLE_API_KEY="$REACT_APP_GOOGLE_API_KEY" \
--build-arg REACT_APP_BASE_URL="$REACT_APP_BASE_URL" \
.
docker tag $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/v3admin:$CIRCLE_BRANCH-$CIRCLE_BUILD_NUM $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/v3admin:$CIRCLE_BRANCH
docker save $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/v3admin:$CIRCLE_BRANCH | gzip -c > workspace/admin_latest.tar.gz
