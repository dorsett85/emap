from django.db import connection


class QueryHelper:
    def __init__(self, query, inputs=None):
        self.cursor = connection.cursor()
        self.cursor.execute(query, inputs)
        rows = self.cursor.fetchall()
        self.rows = rows if rows else None
        self.results = None

    def to_array(self):
        if self.rows:
            keys = [col[0] for col in self.cursor.description]
            self.results = [{key: val for key, val in zip(keys, row)} for row in self.rows]
        return self

    def to_dict(self):
        if self.rows:
            keys = [col[0] for col in self.cursor.description]
            vals = [val for val in self.rows[0]]
            self.results = dict(zip(keys, vals))
        return self
