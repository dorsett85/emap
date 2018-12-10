from django.db import connection


class QueryHelper:
    def __init__(self, query, inputs=None):
        self.cursor = connection.cursor()
        self.cursor.execute(query, inputs)
        self.rows = None
        self.results = None

    def fetchall(self):
        self.rows = self.cursor.fetchall()
        return self

    def fetchall_array(self):
        self.fetchall()
        if self.rows:
            keys = [col[0] for col in self.cursor.description]
            self.results = [{key: val for key, val in zip(keys, row)} for row in self.rows]
        return self

    def fetchall_dict(self):
        self.fetchall()
        if self.rows:
            keys = [col[0] for col in self.cursor.description]
            vals = [val for val in self.rows[0]]
            self.results = dict(zip(keys, vals))
        return self

    @classmethod
    def get_games(cls, user_id=None):
        if user_id is None:
            return cls('''
                SELECT id, name, title, description, num_answers, difficulty 
                FROM api_game
            ''')
        else:
            return cls('''
                SELECT ag.id, ag.name, ag.title, ag.description, ag.num_answers, ag.difficulty
                FROM api_game AS ag
                WHERE ag.id IN (
                    SELECT aug.game_id
                    FROM api_user_game AS aug
                        INNER JOIN auth_user au on aug.user_id = au.id
                    WHERE au.id = '%s'
                )
            ''', [user_id])

    @classmethod
    def get_last_played(cls, user_id):
        return cls('''
            SELECT ag.id, ag.name, ag.title, ag.description, ag.num_answers, ag.difficulty
            FROM api_game as ag
            WHERE ag.id = (
                SELECT aug.game_id 
                FROM api_user_game AS aug
                WHERE aug.user_id = %s and aug.last_played = true
            )
        ''', [user_id])

    @classmethod
    def set_last_played(cls, query_input):
        return cls('''
            UPDATE api_user_game SET last_played = false
            WHERE user_id = %(user_id)s;
            
            UPDATE api_user_game SET last_played = true
            WHERE user_id = %(user_id)s and game_id = %(game_id)s;
        ''', query_input)

    @classmethod
    def get_all_game_answers(cls, query_input):
        if query_input['game_name'] == "cityPopTop10":
            return cls('''
                SELECT ac.id, lower(ac.name) AS answer, auga2.answer_id -- Make sure to rename the column as answer!!
                FROM api_city AS ac
                    LEFT JOIN (
                        SELECT answer_id
                        FROM api_user_game_answer AS auga
                        WHERE auga.user_id = %(user_id)s AND auga.game_id = %(game_id)s
                    ) AS auga2
                    ON ac.id = auga2.answer_id
                ORDER BY ac.population DESC
                LIMIT 10            
            ''', query_input)
        else:
            return None

    @classmethod
    def add_user_game_answer(cls, query_input):
        return cls('''
            INSERT INTO api_user_game_answer(user_id, answer_id, game_id)
            VALUES (%(user_id)s, %(answer_id)s, %(game_id)s)
        ''', query_input)

    @classmethod
    def get_game_progress(cls, query_input):
        return cls('''
            SELECT ac.name, ac.lat, ac.lon, ac.country, ac.population
                FROM api_city as ac
                    INNER JOIN (
                        SELECT answer_id
                        FROM api_user_game_answer as auga
                        WHERE auga.game_id = %(game_id)s AND auga.user_id = %(user_id)s
                    ) AS auga2
                    ON ac.id = auga2.answer_id
        ''', query_input)
