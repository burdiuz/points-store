from flask import Flask, request

from flaskr.db import get_db
from flaskr.session import is_logged_in, get_logged_user_id


def api_tasks_read():
    db = get_db()

    history = db.execute(
        'SELECT id, amount, title, description, type, duration, active FROM tasks ORDER BY title ASC', (get_logged_user_id(), )).fetchall()

    return {
        "payload": list(map(dict, history))
    }


def api_tasks_create():
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


def api_tasks_update():
    if request.is_json is False:
        return {}

    data = request.json
    cursor = get_db().cursor()

    cursor.execute("""UPDATE tasks SET
        amount=:amount,
        title=:title,
        description=:description,
        active=:active
      WHERE
        id=:id
      """, data)

    cursor.connection.commit()

    return {
        # TODO return updated row?
        "payload": {}
    }


def api_tasks_delete():
    if request.is_json is False:
        return {}

    data = request.json
    cursor = get_db().cursor()

    cursor.execute("""UPDATE tasks SET
        active=0
      WHERE
        id=:id""", data)

    cursor.connection.commit()

    return {
        # TODO return updated row?
        "payload": {}
    }


methods = {
    'GET': api_tasks_read,
    'POST': api_tasks_create,
    'PUT': api_tasks_update,
    'DELETE': api_tasks_delete,
}


def init(bp):
    @bp.route('/tasks', methods=['GET', 'POST', 'PUT', 'DELETE'])
    def api_tasks():
        if is_logged_in() == False:
            return ''

        return methods[request.method]()

    @bp.route('/tasks/active', methods=['GET'])
    def api_tasks_read_active():
        db = get_db()

        history = db.execute(
            'SELECT id, amount, title, description, type, duration, active FROM tasks WHERE active = 1 ORDER BY title ASC', (get_logged_user_id(), )).fetchall()

        return {
            "payload": list(map(dict, history))
        }
