FROM node:8-alpine
WORKDIR /app

RUN apk update && \
  apk add --no-cache \
  docker \
  py-pip \
  curl \
  curl-dev \
  && pip install --upgrade pip \
  && pip install \
  docker-compose \
  && yarn global add \
  graphcool

COPY . /app
COPY ./config/root-graphcoolrc.yml /root/.graphcoolrc

RUN yarn

ENTRYPOINT [ "/app/entrypoint.sh" ]

CMD [ "yarn", "start" ]
