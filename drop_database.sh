#!/bin/bash

# Destroy the emap database to rerun setup.sh
if [ -z ${1+x} ] || [ $1 = '-d' ]; then
  psql -U postgres -c 'DROP DATABASE emap'
  psql -U postgres -c 'DROP USER clayton'
elif [ $1 = '-p' ]; then
  sudo -u postgres psql -c 'DROP DATABASE emap'
  sudo -u postgres psql -c 'DROP USER clayton'
else
  echo 'Set argument to -d (development) or -p (production)'
fi
