#!/bin/bash

set -xeo pipefail

if [[ $CIRCLE_BRANCH == "develop" ]]; then
    AWS_REGION="us-west-2"
elif [[ $CIRCLE_TAG == "master."* ]]; then
    AWS_REGION="us-west-2"
    CIRCLE_BRANCH="master"
else
    AWS_REGION="us-west-2"
fi

mkdir -p workspace
docker build -t $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/v3traffic:$CIRCLE_BRANCH-$CIRCLE_BUILD_NUM .
docker tag $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/v3traffic:$CIRCLE_BRANCH-$CIRCLE_BUILD_NUM $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/v3traffic:$CIRCLE_BRANCH
docker save $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/v3traffic:$CIRCLE_BRANCH | gzip -c > workspace/traffic_latest.tar.gz
