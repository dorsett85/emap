-- 0005_update_game_table.sql
-- Created by Clayton on 1/20/2019

-- Function deleting a game
CREATE OR REPLACE FUNCTION delete_game(game_name VARCHAR)
RETURNS VOID AS
$$
BEGIN
  DELETE FROM api_user_game WHERE game_id = (
  SELECT id
  FROM api_game
  WHERE name = $1
);
  DELETE FROM api_user_game_answer WHERE game_id = (
    SELECT id
    FROM api_game
    WHERE name = $1
  );
  DELETE FROM api_game WHERE name = $1;
END
$$
language 'plpgsql';

-- Function for when new game is added
CREATE OR REPLACE FUNCTION add_game_to_users()
RETURNS TRIGGER AS
$$
DECLARE
  u_id INT;
BEGIN
  FOR u_id in SELECT id FROM auth_user
  LOOP
    IF NOT EXISTS(
      SELECT * FROM api_user_game
      WHERE user_id = u_id
        AND game_id = NEW.id
    )
    THEN
      INSERT INTO api_user_game(user_id, game_id)
      VALUES (u_id, NEW.id);
    END IF;
  END LOOP;
  RETURN NEW;
END
$$
language 'plpgsql';

-- Trigger when new game is added
CREATE TRIGGER trig_add_new_game_to_user
  AFTER INSERT ON api_game
  FOR EACH ROW
  EXECUTE PROCEDURE add_game_to_users();

-- Function for adding new game
CREATE OR REPLACE FUNCTION add_game(
  name VARCHAR, title VARCHAR, description VARCHAR, num_answer INT, difficulty VARCHAR
)
RETURNS VOID AS
$$
BEGIN
  INSERT INTO api_game (name, title, description, num_answers, difficulty)
  VALUES ($1, $2, $3, $4, $5);
END;
$$
language 'plpgsql';

-- Dropping cityAreaTop10 game and adding countryAreaTop10
SELECT delete_game('cityAreaTop10');
SELECT add_game(
  'countryAreaTop10',
  'Countries - Top 10 Area',
  'Guess the top ten biggest countries in the world',
  10,
  'medium'
);
