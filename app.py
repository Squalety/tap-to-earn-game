from flask import Flask, request, jsonify

app = Flask(__name__)

# Endpoint for registration
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    telegram_id = data.get('telegram_id')
    username = data.get('username')

    # Here, you can save the registration data to your database
    # For simplicity, let's just return a success message
    return jsonify({'message': f'Registration successful! Welcome, {username}.'})

# Endpoint for rating
@app.route('/rate', methods=['POST'])
def rate():
    data = request.json
    telegram_id = data.get('telegram_id')
    rating = data.get('rating')

    # Here, you can save the rating to your database
    # For simplicity, let's just return a success message
    return jsonify({'message': f'Thank you for rating the game {rating}/5!'})

if __name__ == '__main__':
    app.run(debug=True)
