import os
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Разрешаем CORS для всех доменов

# Пример хранения пользователей и рейтингов в памяти
users = {}
ratings = {}

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    telegram_id = data.get('telegram_id')
    username = data.get('username')
    
    if telegram_id in users:
        return jsonify({'message': 'User already registered.'}), 400
    
    users[telegram_id] = username
    return jsonify({'message': f'Registration successful! Welcome, {username}.'}), 200

@app.route('/rate', methods=['POST'])
def rate():
    data = request.json
    telegram_id = data.get('telegram_id')
    rating = data.get('rating')
    
    if telegram_id not in users:
        return jsonify({'message': 'User not found.'}), 400
    
    ratings[telegram_id] = rating
    return jsonify({'message': f'Thank you for rating the game {rating}/5!'}), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))  # Получение порта из переменной окружения
    app.run(host='0.0.0.0', port=port, debug=True)