psql postgres docker -f ./reset.sql
psql docker docker -f ./schema.sql
psql docker docker -f ./functions/functions.sql
