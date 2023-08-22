#!/bin/bash

set -xeo pipefail

if [[ $CIRCLE_BRANCH == "develop" ]]; then
    AWS_REGION="us-west-2"
elif [[ $CIRCLE_TAG == "master."* ]]; then
    AWS_REGION="us-west-2"
    CIRCLE_BRANCH="master"
fi

# docker load -i  workspace/traffic_latest.tar.gz
# docker run -it --rm "$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/v3traffic:$CIRCLE_BRANCH" \
# bash -c "npm i puppeteer && npm run ngtest-headless"

echo 'tests not ready yet...'
