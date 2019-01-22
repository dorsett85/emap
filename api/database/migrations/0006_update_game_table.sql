-- 0006_update_game_table.sql
-- Created by Clayton on 1/22/2019

-- Dropping cityEduTop10 game and adding mtnEleTop10
SELECT delete_game('cityEduTop10');
SELECT add_game(
  'mtnEleTop10',
  'Mountains - Top 10 Elevation',
  'Guess the top ten highest mountains in the world',
  10,
  'hard'
);
