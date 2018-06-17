#!/bin/sh
set -e

echo "Setting up local graphcool instance"

graphcool local up

exec "$@"
