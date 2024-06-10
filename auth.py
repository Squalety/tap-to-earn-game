import hashlib
import hmac
import time
from flask import request

SECRET = '7151685692:AAGTPRSfaijRB1NiAccAuxRWkWHWrj7gtsU'

def create_auth_hash(auth_data):
    sorted_data = sorted(auth_data.items())
    data_string = '\n'.join(f"{k}={v}" for k, v in sorted_data)
    secret_key = hashlib.sha256(SECRET.encode()).digest()
    return hmac.new(secret_key, data_string.encode(), hashlib.sha256).hexdigest()


def verify_telegram_auth(auth_data):
    check_hash = auth_data.pop('hash')
    sorted_data = sorted(auth_data.items())
    data_string = '\n'.join(f"{k}={v}" for k, v in sorted_data)
    secret_key = hashlib.sha256(SECRET.encode()).digest()
    hmac_string = hmac.new(secret_key, data_string.encode(), hashlib.sha256).hexdigest()
    
    if hmac_string != check_hash:
        return False

    auth_time = int(auth_data.get('auth_date', 0))
    current_time = int(time.time())
    if current_time - auth_time > 86400:  # 1 day
        return False

    return True
