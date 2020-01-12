FROM clkao/postgres-plv8:12-2

WORKDIR /var/lib/postgresql

RUN git clone https://github.com/eulerto/wal2json.git

RUN apt-get update && apt-get install -y \
  make \
  libpq-dev \
  python-psycopg2 \
  postgresql-server-dev-all \
  postgresql-common \
  postgresql \
  gcc \
  && (cd wal2json && USE_PGXS=1 make && USE_PGXS=1 make install)

RUN echo "/var/lib/postgresql/src/run.sh" > /docker-entrypoint-initdb.d/init.sh \
  && chmod +x /docker-entrypoint-initdb.d/init.sh

COPY data/postgresql.conf ./
COPY src .
