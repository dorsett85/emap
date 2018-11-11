#!/bin/bash

#####
# Script to apply settings and setup the postgresql database in
# development or production
#####

# Add appropriate variables for development vs production setup
if [ -z ${1+x} ] || [ $1 = '-d' ]; then
  echo 'Running development setup'
  settingEnv='development'
  sudo=''
  psql='psql -U postgres'
  pyenv='source pyenv/Scripts/activate'
elif [ $1 = '-p' ]; then
  echo 'Running production setup'
  settingEnv='production'
  sudo='sudo'
  psql='-u postgres psql'
  pyenv='. pyenv/bin/activate'
else
  echo 'Set argument to -d (development) or -p (production)'
fi


##### Initialize settings and database now that development or production variables are set #####

$sudo cp emap/${settingEnv}_settings.py emap/settings.py

# Create database and user owner
$sudo $psql -f api/database/0001_create_emap_database.sql

# Activate python virtual environment
$pyenv

# Run migrations -- Adds Django specific user and authentication tables -- and create super user
python manage.py migrate
python manage.py createsuperuser

# Now that the django tables have been created we can create add our own tables and relations
$sudo $psql -d emap -f api/database/0002_create_game_table.sql

# load in data
$sudo $psql -d emap -c "\copy game(name, description, num_questions, difficulty) \
  FROM 'api/database/data/games.csv' WITH DELIMITER ',' CSV HEADER"

# Add fixture data
python manage.py loaddata worldcities100.json
