import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from auth import verify_telegram_auth, create_auth_hash
from database import init_db, add_score, get_scores
import requests
import time

app = Flask(__name__)
CORS(app)  # Enable CORS for the app
init_db()

TELEGRAM_BOT_TOKEN = '7151685692:AAGTPRSfaijRB1NiAccAuxRWkWHWrj7gtsU'
WEBHOOK_URL = 'https://squalety-tap-to-earn-game-6d76.twc1.net/set_webhook'

def set_webhook():
    url = f'https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/setWebhook'
    response = requests.post(url, data={'url': WEBHOOK_URL})
    if response.status_code == 200:
        print('Webhook set successfully')
    else:
        print('Failed to set webhook')

@app.route('/webhook', methods=['POST'])
def webhook():
    update = request.json
    if 'message' in update:
        message = update['message']
        chat_id = message['chat']['id']
        user_id = message['from']['id']
        text = message.get('text')

        if text == '/start':
            send_message(chat_id, "Welcome to the Tap to Earn Game! Use /auth to authenticate.")
        elif text == '/auth':
            auth_data = {
                'auth_date': int(time.time()),
                'user_id': user_id,
                'chat_id': chat_id
            }
            auth_hash = create_auth_hash(auth_data)
            auth_data['hash'] = auth_hash
            # Send auth data to the user for verification
            send_message(chat_id, f"Authenticate using this data: {auth_data}")

    return jsonify({'status': 'ok'})

def send_message(chat_id, text):
    url = f'https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage'
    payload = {'chat_id': chat_id, 'text': text}
    requests.post(url, json=payload)

@app.route('/update-score', methods=['POST'])
def update_score():
    data = request.json
    user_id = data.get('user_id')
    score = data.get('score')
    if not user_id or not score:
        return jsonify({'error': 'Invalid data'}), 400

    add_score(user_id, score)
    return jsonify({'success': True}), 200

@app.route('/get-scores', methods=['GET'])
def get_scores_route():
    scores = get_scores()
    return jsonify(scores), 200

@app.route('/auth', methods=['POST'])
def auth():
    data = request.json
    auth_data = data.get('auth_data')
    if verify_telegram_auth(auth_data):
        return jsonify({'success': True}), 200
    return jsonify({'error': 'Unauthorized'}), 401

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    set_webhook()
    app.run(host='0.0.0.0', port=port)
