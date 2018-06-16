#!/bin/sh
set -e


echo "starting entrypoint…"

graphcool local up
# graphcool deploy --target local

exec "$@"
