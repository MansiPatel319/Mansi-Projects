#!/bin/bash

set -xeo pipefail

if [[ "$ENV" == 'local' ]]; then
  npm start
else
  echo "not local, build for prod"
  mkdir -p /usr/share/nginx/html/
  cp -R /app/build/* /usr/share/nginx/html/
  cp /app/nginx.conf /etc/nginx/conf.d/default.conf
  cp /app/supervisor.conf /etc/supervisor/conf.d/
  supervisord -n
fi
