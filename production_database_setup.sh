#!/usr/bin/env bash

# Copy production settings
cp emap/production_settings.py emap/settings.py

# Create database and user owner
sudo -u postgres psql -f api/database/0001_create_emap_database.sql

# Activate python virtual environment
source pyenv/bin/activate

# Run migrations -- Adds Django specific user and authentication tables -- and create super user
manage.py migrate
python manage.py createsuperuser

# Add fixture data
python manage.py loaddata worldcities100.json


# Pause after completion to check for errors
echo -e "\nDone"
read