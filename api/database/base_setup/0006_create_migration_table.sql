-- 0006_create_migration_table.sql
-- Created by Clayton on 12/6/2018

CREATE TABLE api_migration (
  id SERIAL PRIMARY KEY,
  file VARCHAR NOT NULL UNIQUE,
  migrated BOOLEAN DEFAULT FALSE
);

GRANT ALL PRIVILEGES ON TABLE api_migration TO clayton;
GRANT ALL PRIVILEGES ON TABLE api_migration_id_seq TO clayton;

