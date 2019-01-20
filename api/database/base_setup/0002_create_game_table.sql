-- 0002_create_game_table.sql
-- Created by Clayton on 11/2/2018

CREATE TABLE api_game (
  id serial primary key,
  name varchar not null UNIQUE,
  title varchar not null,
  description varchar not null,
  num_answers int not null,
  difficulty varchar CHECK (difficulty in ('easy', 'medium', 'hard'))
);

GRANT ALL PRIVILEGES ON TABLE api_game TO clayton;
