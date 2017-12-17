FROM jjanzic/docker-python3-opencv
WORKDIR /src

USER root

RUN apt-get -qq update \
  && apt-get -qqy install vim curl \
  && curl -sL https://deb.nodesource.com/setup_8.x | bash - \
  && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
  && echo "deb https://dl.yarnpkg.com/debian/ stable main" >> /etc/apt/sources.list.d/yarn.list \
  && apt-get update -qq \
  && apt-get install -y nodejs yarn


COPY . /src

RUN chown -R $USER:$USER /src

USER $USER

RUN yarn

CMD npm start
