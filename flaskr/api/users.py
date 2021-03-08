from flask import Flask, request

from flaskr.session import is_logged_in, is_logged_admin
from flaskr.db import get_db


def api_users_read():
    db = get_db()

    users = db.execute(
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
    return ''


def api_users_update():
    return ''


def api_users_delete():
    return ''


methods = {
    'GET': api_users_read,
    'POST': api_users_create,
    'PUT': api_users_update,
    'DELETE': api_users_delete,
}


def init(bp):
    @bp.route('/users', methods=['GET', 'POST', 'PUT', 'DELETE'])
    def api_users():
        if is_logged_in() == False:
            return ''

        return methods[request.method]()
