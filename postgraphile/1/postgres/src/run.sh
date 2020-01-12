#!/bin/bash

# Run from here
cd "$(dirname "$0")"

psql postgres docker -f ./reset.sql
psql docker docker -f ./schema.sql
psql docker docker -f ./functions/functions.sql
