#!/usr/bin/env bash

# Copy development settings
cp emap/development_settings.py emap/settings.py

# Create database and user owner
psql -U postgres -f api/database/0001_create_emap_database.sql

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
