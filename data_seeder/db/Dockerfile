FROM postgres:12

EXPOSE 5432
# run create.sql on init
ADD createdatabase.sql /docker-entrypoint-initdb.d
