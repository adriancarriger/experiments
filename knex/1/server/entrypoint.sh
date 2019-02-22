#!/bin/sh
set -e

until PGPASSWORD='docker' psql -h "db" -U "docker" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - running migrations"
knex migrate:latest
knex seed:run

exec "$@"
