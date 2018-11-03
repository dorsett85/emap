-- 0002_create_game_table.sql
-- Created by Clayton on 11/2/2018

CREATE TABLE game (
  ID serial primary key,
  name varchar not null,
  description varchar not null,
  num_questions int,
  difficulty varchar CHECK (difficulty in ('easy', 'medium', 'hard'))
)