from flask import Flask, request
import hashlib
import uuid

from flaskr.session import is_logged_in, is_logged_admin
from flaskr.db import get_db


def hash_password(password, salt):
    return hashlib.sha512(str(password, 'utf-8') + salt).hexdigest()


def generate_salt():
    return str(uuid.uuid4().hex, 'utf-8')


def api_users_read():
    cursor = get_db().cursor()

    users = cursor.execute(
        'SELECT id, username, role, active FROM users ORDER BY username').fetchall()

    # if is_logged_admin():
    #    users = db.execute(
    #        'SELECT id, username, role, active FROM users ORDER BY username').fetchall()
    # else:
    #    users = db.execute(
    #        'SELECT id, username, role, active FROM users WHERE active=1 ORDER BY username').fetchall()

    return {
        "payload": list(map(dict, users))
    }


def api_users_create():
    if request.is_json is False:
        return {}

    data = dict(request.json)
    cursor = get_db().cursor()

    data['salt'] = generate_salt()
    data['password'] = hash_password(data['password'], data['salt'])

    cursor.execute("""INSERT INTO users (
        username, role, active, password, salt
      ) VALUES (
        :username, :role, :active, :password, :salt
      )""", data)

    cursor.connection.commit()

    return {
        # TODO return created row?
        "payload": cursor.lastrowid
    }


def api_users_patch():
    if request.is_json is False:
        return {}

    data = request.json
    cursor = get_db().cursor()

    cursor.execute("""UPDATE users SET
        role=:role, active=:active
      WHERE
        id=:id
      """, data)

    cursor.connection.commit()

    return {
        # TODO return updated row?
        "payload": {}
    }


def api_users_delete():
    return ''


methods = {
    'GET': api_users_read,
    'POST': api_users_create,

    # I use patch because not all User parameters can be changed
    'PATCH': api_users_patch,
    'DELETE': api_users_delete,
}


def init(bp):
    @bp.route('/users', methods=['GET', 'POST', 'PATCH', 'DELETE'])
    def api_users():
        if is_logged_in() == False:
            return ''

        return methods[request.method]()

    # Change password routine
    @bp.route('/users/password', methods=['PUT'])
    def api_users_password():
        if is_logged_in() == False or request.is_json is False:
            return {}

        id = request.json['id']
        old_password = request.json['old_password']
        new_password = request.json['new_password']

        cursor = get_db().cursor()

        row = cursor.execute('SELECT password, salt WHERE id = ?', (id, ))

        if hash_password(old_password, row['salt']) != row['password']:
            # TODO return error and limit tries to 3 per 15 minutes
            return {
                'error': 'Password does not match'
            }

        salt = generate_salt()
        cursor.execute('UPDATE users SET password=?, salt=? WHERE id = ?',
                       (hash_password(new_password, salt), salt, id, ))

        cursor.connection.commit()

        return {
            # TODO just return HTTP 200 Ok, this should be enough
            "payload": 'Ok'
        }
