FROM node:alpine
WORKDIR /app

ENV DOCKER=true

RUN apk --no-cache add \
  curl \
  postgresql-client \
  && yarn global add \
  knex

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

CMD [ "yarn", "start" ]
