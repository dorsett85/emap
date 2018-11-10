#!/usr/bin/env bash

#####
# Script to apply settings and setup the postgresql database in
# development or production
#####

# Add appropriate variables for development vs production setup
if [ -z ${1+x} ] || [ $1 = '-d' ]; then
  echo 'Running development setup'
  sudo=''
  psql='psql -U postgres'
elif [ $1 = '-p' ]; then
  echo 'Running production setup'
  sudo='sudo '
  psql='-u postgres psql'
else
  echo 'Set argument to -d (development) or -p (production)'
fi


##### Initialize settings and database now that development or production variables are set #####

$sudo cp emap/development_settings.py emap/settings.py

# Create database and user owner
$psql -f api/database/0001_create_emap_database.sql

# Activate python virtual environment
source pyenv/Scripts/activate

# Run migrations -- Adds Django specific user and authentication tables -- and create super user
python manage.py migrate
python manage.py createsuperuser

# Add fixture data
python manage.py loaddata worldcities100.json


# Pause after completion to check for errors
echo -e "\nDone"
read
