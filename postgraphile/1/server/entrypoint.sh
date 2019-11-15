#!/bin/sh
set -e

until PGPASSWORD='docker' psql -h "db" -U "docker" -c '\q' > /dev/null 2>&1; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 2
done

>&2 echo "Postgres is up - running migrations"
knex migrate:latest
knex seed:run

exec "$@"
