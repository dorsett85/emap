# emap

Mapbox app with Django and React.js

## setup

Required software
1. python 3.6 (newer versions may have issues installing requirements.txt)
2. node 12
3. postgres

### production setup (ssh'd into server as sudo root user 'clayton')

Required software (in addition to those required below the initial setup)
1. python3.6-dev
2. python3.6-venv
3. nginx

```bash
cd /var/www/
sudo git clone git@github.com:dorsett85/emap
sudo chown -R clayton:clayton emap/
cd emap/

# Create emap database with 
sh utils.sh setup -p

# Make a virtual environment and install packages
python3.6 -m venv pyenv
source pyenv/bin/activate
pip install -r requirements.txt
pip install gunicorn

# In case base django migrations need to be run
python manage.py migrate

# util.sh migrate -p is not working so we'll need to manually apply
# additional migraions.
psql -d emap -f api/database/migrations/0003_update_privileges.sql
psql -d emap -f api/database/migrations/0004_create_country_table.sql
psql -d emap -f api/database/migrations/0005_update_game_table.sql
psql -d emap -f api/database/migrations/0006_update_game_table.sql

# Build frontend
npm i
npm run build 
```

Next up we'll follow the tutorial at this link (starting form "Testing Gunicorn’s Ability to Serve the Project"):

https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-20-04


## TODO

1. Fix `api/database/migrations/add_migrations.py`
2. Update `utils.sh`
