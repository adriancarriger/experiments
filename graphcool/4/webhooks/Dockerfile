FROM node:8-alpine

WORKDIR /app
ENV USER node

RUN apk update && \
  apk add --no-cache \
  curl \
  curl-dev

COPY . /app
RUN chown -R $USER:$USER /app

USER $USER

RUN yarn

CMD [ "yarn", "start" ]
