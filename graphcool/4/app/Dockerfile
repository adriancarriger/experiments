FROM node:8-alpine
WORKDIR /app

RUN apk update && apk add --no-cache \
  docker \
  py-pip \
  curl \
  curl-dev \
  && pip install --upgrade pip \
  && pip install \
  docker-compose \
  awscli \
  && yarn global add graphcool

COPY . /app

ENTRYPOINT ["/app/entrypoint.sh"]

# USER root
# RUN chown -R $USER:$USER /app

# USER $USER

# RUN yarn
