-- 0005_create_user_game_answer_table.sql
-- Created by Clayton on 12/2/2018

CREATE TABLE api_user_game_answer (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES auth_user(id),
  answer_id INT NOT NULL,
  game_id INT NOT NULL REFERENCES api_game(id)
);

GRANT ALL PRIVILEGES ON TABLE api_user_game_answer TO clayton;
GRANT ALL PRIVILEGES ON TABLE api_user_game_answer_id_seq TO clayton;

