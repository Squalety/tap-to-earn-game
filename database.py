import sqlite3

def init_db():
    conn = sqlite3.connect('game.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS scores (
            id INTEGER PRIMARY KEY,
            user_id TEXT NOT NULL,
            score INTEGER NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

def add_score(user_id, score):
    conn = sqlite3.connect('game.db')
    cursor = conn.cursor()
    cursor.execute('INSERT INTO scores (user_id, score) VALUES (?, ?)', (user_id, score))
    conn.commit()
    conn.close()

def get_scores():
    conn = sqlite3.connect('game.db')
    cursor = conn.cursor()
    cursor.execute('SELECT user_id, score FROM scores ORDER BY score DESC')
    scores = cursor.fetchall()
    conn.close()
    return [{'user_id': user_id, 'score': score} for user_id, score in scores]
