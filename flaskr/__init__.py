from os import urandom, path, makedirs
from flask import Flask


def create_app(test_config=None):
    app = Flask(
        __name__,
        instance_relative_config=True,
        static_url_path='/static',
        static_folder='../view/build/static'
    )

    app.config.from_mapping(
        SECRET_KEY=urandom(16),
        DATABASE=path.join(app.instance_path, 'flaskr.sqlite'),
    )

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    try:
        makedirs(app.instance_path)
    except OSError:
        pass

    from . import db
    db.init_app(app)

    # Routings for the client are here

    from . import view
    view.init(app)

    from . import api
    app.register_blueprint(api.bp)

    return app
