# construction-v3
Docker compose for all Construction V3 projects


## Clone
`git clone git@github.com:voyagecontrol/construction-v3.git`  
`cd construction-v3`

#### pull all projects
`./construction-v3 clone`
#### checkout dev branch
`./construction-v3 checkout develop`

## Run
#### start docker-compose
`docker-compose up`

#### stop docker-compose
`docker-compose down`

#### rebuild services without cache and start docker-compose
`docker-compose up --build --force-recreate`

#### start frontend
`docker-compose up rest-api`

#### start backend
`docker-compose up traffic`

## Build containers in parallel
`docker-compose build --parallel`
`docker-compose up`

# Using Proxy

If we want to have the same env as in staging and production we need to use proxy
To use proxy you need to change /etc/hosts file on your local OS and redirect 127.0.0.1 -> local-app.voyagecontrol.com

example 
```bash
# localhost name resolution is handled within DNS itself.
127.0.0.1       localhost
::1             localhost
127.0.0.1       local-app.voyagecontrol.com
127.0.0.1       local-admin.voyagecontrol.com
```

# Docker exception on windows

## Docker For Windows 18.03 stable: access denied for mounting /var/run/sock
https://github.com/docker/for-win/issues/1889
##### Error
```
$ docker-compose up -d proxy
Creating vc_proxy_1 ... error

ERROR: for vc_proxy_1  Cannot create container for service proxy: b'Mount denied:\nThe source path "\\\\var\\\\run\\\\docker.sock:/var/run/docker.sock"\nis not a valid Windows path'

ERROR: for proxy  Cannot create container for service proxy: b'Mount denied:\nThe source path "\\\\var\\\\run\\\\docker.sock:/var/run/docker.sock"\nis not a valid Windows path'
ERROR: Encountered errors while bringing up the project.
```
##### Fix
export COMPOSE_CONVERT_WINDOWS_PATHS=1
