#!/bin/bash
# ------------------------------------------------------------------
# [Toshe Mitev] Build/Run docker container for this project
# ------------------------------------------------------------------

SUBJECT=87e855a3-7fe0-4853-914a-2c30bd08a8b0

# --- Locks -------------------------------------------------------
LOCK_FILE=/tmp/$SUBJECT.lock
if [ -f "$LOCK_FILE" ]; then
   echo "$(basename $0)" " is already running"
   exit
fi

trap "rm -f $LOCK_FILE" EXIT
touch $LOCK_FILE

# scripts
IMIN="$( cd "$( dirname "$0" )" && pwd )"

FILES_PATH="$(dirname $(dirname "$IMIN"))/rms-server/rms_server/files"

# --- Body --------------------------------------------------------
docker network create rms-network || echo 'Network "rms-network" already created!'

# Update the base image
docker pull node:12.16.3-stretch-slim

docker build --force-rm -t rms-web -f docker/Dockerfile .
docker rmi "$(docker images -f "dangling=true" -q)"

docker run --name rms-web-nginx -p 80:80 -p 81:81 -p 82:82 -p 443:443 -p 444:444 \
    --network=rms-network \
    -v /tmp:/tmp \
    -v $FILES_PATH:/usr/share/nginx/files \
    -v "$(pwd)"/webapp:/usr/share/nginx/html:ro \
    -v "$(pwd)"/etc/docker_nginx_dev.conf:/etc/nginx/conf.d/default.conf \
    -v "$(pwd)"/etc/docker_nginx_dist.conf:/etc/nginx/conf.d/dist.conf \
    -v "$(pwd)"/etc/docker_nginx_rmss_dev.conf:/etc/nginx/conf.d/rmss.conf \
    -v "$(pwd)"/etc/ssl:/etc/nginx/ssl \
    -d nginx:alpine sh -c "while true; do nginx -g 'daemon off;'; sleep 1; done"

# rms-web webapp container
# Notice the non mapping volume mount /project/webapp/node_modules, it
# is used as a placeholder for the dependencies that were already
# installed when this image was built (docker build above). We are using
# the docker caching mechanism which means that the dependencies are being
# installed at 'build' stage only if packages.json or yarn.lock is modified.


docker run --rm -it --name=rms-web \
    -v "$(pwd)":/project --mount source=rms-web_deps,target=/project/webapp/node_modules \
    -v /tmp:/tmp --hostname rms-web --network=rms-network \
    rms-web tmux -L rms-web

docker rm -f rms-web-nginx

DANGLING=$(docker images -f "dangling=true" -q)
if [ "x""$DANGLING" != "x" ]; then
    docker rmi $DANGLING
fi

echo "Successfuly destroyed all linked containers"

exit 0
