from flaskr.session import set_session_user
import hashlib
import uuid

from flask import (
    request, session
)

from flaskr.db import get_db

#            salt = uuid.uuid4().hex
#            hashed_password = hashlib.sha512(
#                (password + salt).encode('utf8')).hexdigest()


def init(bp):
    @bp.route('/login', methods=['POST'])
    def api_login():
        error = None
        username = None
        password = None
        if request.is_json:
            username = request.json.get('username')
            password = request.json.get('password')

        db = get_db()

        if not username:
            error = 'Username is required.'
        elif not password:
            error = 'Password is required.'

        if error is None:
            record = db.execute(
                'SELECT id, username, password, salt, role FROM users WHERE username = ? AND active = 1', (username, )).fetchone()

            if record is None:
                return {
                    "error": 'User {} not found.'.format(username)
                }
            hashed_password = hashlib.sha512(
                (password + record['salt']).encode('utf8')).hexdigest()

            if hashed_password != record['password']:
                return {
                    "error": 'User {} not found.'.format(username)
                }

            set_session_user(record['id'], record['role'])
            return {
                "id": record['id'],
                'username': record['username'],
                'role': record['role']
            }

    @bp.route('/logout', methods=['POST'])
    def api_logout():
        session.clear()

        return {}
