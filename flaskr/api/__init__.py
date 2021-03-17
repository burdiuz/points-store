import functools

from flask import (
  Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash

from flaskr.db import get_db

bp = Blueprint('api', __name__, url_prefix='/api')

from . import login
login.init(bp)

from . import me
me.init(bp)

from . import users
users.init(bp)

from . import history
history.init(bp)

from . import points
points.init(bp)

from . import tasks
tasks.init(bp)
