FROM node:alpine
WORKDIR /app

RUN apk --no-cache add \
  curl

COPY package.json .

RUN yarn

COPY . .

ENTRYPOINT ["./entrypoint.sh"]

CMD [ "yarn", "start" ]
