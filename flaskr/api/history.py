from flask import Flask, request
from flaskr.session import is_logged_in, get_logged_user_id
from flaskr.db import get_db


def api_history_read():
    db = get_db()

    history = db.execute(
        'SELECT id, sender_id, receiver_id, type, amount, task_id, comment, created FROM history WHERE receiver_id = ? ORDER BY created DESC', (get_logged_user_id(), )).fetchall()

    return {
        "payload": list(map(dict, history))
    }


def api_history_append():
    if request.is_json is False:
        return {}

    cursor = get_db().cursor()
    data = dict(request.json)
    data['sender_id'] = get_logged_user_id()

    cursor.execute("""INSERT INTO history (
        sender_id, receiver_id, amount, task_id, comment
      ) VALUES (
        :sender_id, :receiver_id, :amount, :task_id, :comment
      )""", data)

    cursor.connection.commit()

    return {
        # TODO return created row?
        "payload": cursor.lastrowid
    }


def init(bp):
    @bp.route('/history', methods=['GET', 'POST'])
    def api_history():
        if is_logged_in() == False:
            return {
                "payload": []
            }

        if request.method == 'POST':
            return api_history_append()

        return api_history_read()
