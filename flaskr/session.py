from flask import session


def set_session_user(id, role):
    session["id"] = id
    session["role"] = role


def is_logged_in():
    return 'id' in session and session['id'] is not None


def get_logged_user_id():
    if 'id' in session:
        return session['id']

    return None


def is_logged_admin():
    return 'role' in session and session['role'] == 'admin'
