-- Initial setup for api app
CREATE DATABASE emap;
CREATE USER clayton WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE emap TO clayton;
