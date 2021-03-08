from flask import session

from flaskr.db import get_db


def init(bp):
    @bp.route('/me', methods=['GET'])
    def api_me():
        user_id = None

        if 'id' in session:
            user_id = session['id']

        if user_id is None:
            return {}

        db = get_db()

        record = db.execute(
            'SELECT id, username, role FROM users WHERE id = ?', (user_id)).fetchone()

        return record
