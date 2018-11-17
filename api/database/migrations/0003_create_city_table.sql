-- 0003_create_city_table.sql
-- Created by Clayton on 11/17/2018

CREATE TABLE api_city (
  ID serial primary key,
  name varchar not null,
  lat float not null,
  lon float not null,
  country varchar not null,
  population int not null
);

GRANT ALL PRIVILEGES ON TABLE api_city TO clayton;
