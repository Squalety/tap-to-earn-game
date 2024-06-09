from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

def init_db():
    with sqlite3.connect('database.db') as conn:
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS leaderboard (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT,
                score INTEGER
            )
        ''')
        conn.commit()

@app.route('/submit-score', methods=['POST'])
def submit_score():
    data = request.json
    score = data.get('score')
    username = 'test_user'  # Placeholder for Telegram authentication

    with sqlite3.connect('database.db') as conn:
        cursor = conn.cursor()
        cursor.execute('INSERT INTO leaderboard (username, score) VALUES (?, ?)', (username, score))
        conn.commit()

    return jsonify({'status': 'success'})

@app.route('/leaderboard', methods=['GET'])
def leaderboard():
    with sqlite3.connect('database.db') as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT username, score FROM leaderboard ORDER BY score DESC LIMIT 10')
        leaderboard = cursor.fetchall()
        leaderboard = [{'username': row[0], 'score': row[1]} for row in leaderboard]
    return jsonify(leaderboard)

if __name__ == '__main__':
    init_db()
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
