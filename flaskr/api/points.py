from flaskr.db import get_db
from flaskr.session import is_logged_in, get_logged_user_id


def init(bp):
    @bp.route('/points', methods=['GET'])
    def api_points():
        if is_logged_in() is False:
            return {}

        db = get_db()

        record = db.execute('SELECT amount FROM points WHERE user_id = ?',
                            (get_logged_user_id(), )).fetchone()

        if record is None:
            return {}

        return dict(record)
