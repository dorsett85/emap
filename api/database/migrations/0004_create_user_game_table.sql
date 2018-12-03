-- 0004_create_user_game_table.sql
-- Created by Clayton on 11/17/2018

CREATE TABLE api_user_game (
  ID SERIAL PRIMARY KEY,
  user_id INT REFERENCES auth_user(id),
  game_id INT REFERENCES api_game(id),
  last_played BOOLEAN DEFAULT FALSE
);

GRANT ALL PRIVILEGES ON TABLE api_user_game TO clayton;
GRANT ALL PRIVILEGES ON TABLE api_user_game_id_seq TO clayton;

-- Add rows when a new user is created that matches all of the games
CREATE OR REPLACE FUNCTION add_user_games()
  RETURNS TRIGGER AS
$BODY$
DECLARE
  game INT;
BEGIN
  FOR game IN SELECT id FROM api_game
  LOOP
    raise notice 'This id is %', game;
    INSERT INTO api_user_game(user_id, game_id)
    VALUES(new.id, game);
  end loop;
  RETURN new;
END;
$BODY$
language 'plpgsql';

CREATE TRIGGER trig_add_user_games
  AFTER INSERT ON auth_user
  FOR EACH ROW
  EXECUTE PROCEDURE add_user_games();
