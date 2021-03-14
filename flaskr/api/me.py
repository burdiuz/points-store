from flaskr.db import get_db
from flaskr.session import is_logged_in, get_logged_user_id


def init(bp):
    @bp.route('/me', methods=['GET'])
    def api_me():
        if is_logged_in() is False:
            return {}

        db = get_db()

        record = db.execute(
            'SELECT id, username, role FROM users WHERE id = ?', (get_logged_user_id(), )).fetchone()

        return dict(record)
