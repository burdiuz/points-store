from flask import Flask, request

from flaskr.db import get_db
from flaskr.session import is_logged_in


def api_tasks_read():
    return {}


def api_tasks_create():
    return ''


def api_tasks_update():
    return ''


def api_tasks_delete():
    return ''


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
