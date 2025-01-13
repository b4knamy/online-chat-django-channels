#!/bin/sh

# O shell irá encerrar a execução do script quando um comando falhar
set -e

while ! nc -z $REDIS_HOST $REDIS_PORT; do
  echo "🟡 Waiting for Redis Database Startup ($REDIS_HOST $REDIS_PORT) ..."
  sleep 2
done

echo "✅ Redis Database Started Successfully ($POSTGRES_HOST:$POSTGRES_PORT)"

# python manage.py collectstatic --noinput
python manage.py makemigrations --noinput
python manage.py migrate --noinput
python manage.py create_users
python manage.py runserver 0.0.0.0:8000