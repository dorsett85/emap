#!/bin/bash

#####
# Script to apply settings and setup the postgresql database in
# development or production
#####

if [ -z ${1+x} ] || [ $1 = '-d' ]; then
  echo 'Running development setup'
  cp emap/development_settings.py emap/settings.py

  # Create database and user owner
  psql -U postgres -f api/database/migrations/0001_create_emap_database.sql

  # Activate python virtual environment
  source pyenv/Scripts/activate

  # Run migrations -- Adds Django specific user and authentication tables -- and create super user
  manage.py migrate
  manage.py createsuperuser

  # Now that the django tables have been created we can create add our own tables and relations
  psql -U postgres -d emap -f api/database/migrations/0002_create_game_table.sql
  psql -U postgres -d emap -f api/database/migrations/0003_create_city_table.sql

  # load in data
  psql -U postgres -d emap -c "\copy api_game(name, description, num_questions, difficulty) \
    FROM 'api/database/data/games.csv' WITH DELIMITER ',' CSV HEADER"

  psql -U postgres -d emap -c "\copy api_city(name, lat, lon, country, population) \
    FROM 'api/database/data/worldcities100.csv' WITH DELIMITER ',' CSV HEADER"

  # Dump database to setup on production
  pg_dump -U postgres -Fc emap > api/database/dump/emap.dump

elif [ $1 = '-p' ]; then
  echo 'Running production setup'
  sudo cp emap/production_settings.py emap/settings.py

  # Remove old database and user
  sudo -u postgres dropdb emap
  sudo -u postgres dropuser clayton

  # Create database and user owner
  sudo -u postgres psql -f api/database/migrations/0001_create_emap_database.sql

  # Restore database built from development
  sudo -u postgres pg_restore -C -d postgres api/database/dump/emap.dump

else
  echo 'Set argument to -d (development) or -p (production)'
fi
