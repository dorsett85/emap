-- Initial setup for api app
CREATE DATABASE emap;
CREATE USER clayton WITH PASSWORD 'password'
  superuser
  createdb
  createrole
  replication
  bypassrls;

