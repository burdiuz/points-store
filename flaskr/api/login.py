from flaskr.session import set_session_user
import hashlib
import uuid

from flask import (
    request, session
)

from flaskr.db import get_db


def init(bp):
    @bp.route('/login', methods=['POST'])
    def api_login():
        error = None
        username = None
        password = None
        if request.is_json():
            username = request.json.username
            password = request.json.password

        db = get_db()

        if not username:
            error = 'Username is required.'
        elif not password:
            error = 'Password is required.'

        if error is None:
            salt = uuid.uuid4().hex
            hashed_password = hashlib.sha512(
                (password + salt).encode('utf8')).hexdigest()

            record = db.execute(
                'SELECT id, username, role FROM user WHERE username = ? AND password = ? AMD active = 1', (username, hashed_password)).fetchone()
            if record is not None:
                set_session_user(record['id'], record['role'])
                return record
            else:
                error = 'User {} not found.'.format(username)

        return {
            "error": error
        }

    @bp.route('/logout', methods=['POST'])
    def api_logout():
        session.clear()

        return {}
