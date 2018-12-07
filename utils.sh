#!/bin/bash

#####
# This script has several purposes and utilities:
#
# 1. Apply settings and setup the postgresql database in development or production
#   - Run 'utils.sh setup -d' or 'utils.sh setup -p'
#   - * Running 'utils.sh -p' will create the database using a db dump file
# 2. Add database migrations
#   - Run 'utils.sh migrate -d' or 'sudo utils.sh migrate -p'
# 3. Drop the database and start from scratch
#   - Run 'utils.sh dropdb -d' or 'utils.sh dropdb -p'
# 4. Update settings file
#   - Run 'utils.sh updatesettings -d' or 'utils.sh updatesettings -p'
#
#####


##### 1. Initial setup #####
if [ $1 = 'setup' ]; then

    if [ -z ${2+x} ] || [ $2 = '-d' ]; then # development
        echo 'Running development setup'
        cp emap/development_settings.py emap/settings.py

        # Create database and user owner
        psql -U postgres -f api/database/base_setup/0001_create_emap_database.sql

        # Activate python virtual environment
        source pyenv/Scripts/activate

        # Run migrations -- Adds Django specific user and authentication tables
        manage.py migrate

        # Now that the django tables have been created we can create add our own tables and relations
        psql -U postgres -d emap -f api/database/base_setup/0002_create_game_table.sql
        psql -U postgres -d emap -f api/database/base_setup/0003_create_city_table.sql
        psql -U postgres -d emap -f api/database/base_setup/0004_create_user_game_table.sql
        psql -U postgres -d emap -f api/database/base_setup/0005_create_user_game_answer_table.sql
        psql -U postgres -d emap -f api/database/base_setup/0006_create_migration_table.sql

        # load in data
        psql -U postgres -d emap -c "\copy api_game(name, title, description, num_answers, difficulty) \
        FROM 'api/database/data/games.csv' WITH DELIMITER ',' CSV HEADER"

        psql -U postgres -d emap -c "\copy api_city(name, lat, lon, country, population) \
        FROM 'api/database/data/worldcities100.csv' WITH DELIMITER ',' CSV HEADER"

        # Create super user
        manage.py createsuperuser

        # Dump database to setup on production
        pg_dump -U postgres -Fc emap > api/database/dump/emap.dump

    elif [ $2 = '-p' ]; then # production
        echo 'Running production setup'
        sudo cp emap/production_settings.py emap/settings.py

        # Remove old database and user
        sudo -u postgres dropdb emap
        sudo -u postgres dropuser clayton

        # Create database and user owner
        sudo -u postgres psql -f api/database/base_setup/0001_create_emap_database.sql

        # Restore database built from development
        sudo -u postgres pg_restore -C -d postgres api/database/dump/emap.dump

    else
        echo 'Set argument to -d (development) or -p (production)'
    fi

##### 2. Add migrations #####
elif [ $1 = 'migrate' ]; then
    if [ -z ${2+x} ] || [ $2 = '-d' ]; then # development
        source pyenv/Scripts/activate
        python api/database/migrations/add_migrations.py
    elif [ $2 = '-p' ]; then # production
        sudo -u postgres psql -c 'DROP DATABASE emap'
        sudo -u postgres psql -c 'DROP USER clayton'
    else
        echo 'Set argument to -d (development) or -p (production)'
    fi


##### 3. Drop database #####
elif [ $1 = 'dropdb' ]; then
    if [ -z ${2+x} ] || [ $2 = '-d' ]; then # development
        psql -U postgres -c 'DROP DATABASE emap'
        psql -U postgres -c 'DROP USER clayton'
    elif [ $2 = '-p' ]; then # production
        sudo -u postgres psql -c 'DROP DATABASE emap'
        sudo -u postgres psql -c 'DROP USER clayton'
    else
        echo 'Set argument to -d (development) or -p (production)'
    fi


##### 4. Update settings #####
elif [ $1 = 'updatesettings' ]; then
    if [ -z ${2+x} ] || [ $2 = '-d' ]; then # development
        cp emap/development_settings.py emap/settings.py
    elif [ $2 = '-p' ]; then # production
        sudo cp emap/production_settings.py emap/settings.py
    else
        echo 'Set argument to -d (development) or -p (production)'
    fi


##### Messages if no arguments match
elif [ -z ${1+x} ]; then
    echo 'You must specifiy a utility to run'
else
    echo "First argument didn't match any utilities"
fi
