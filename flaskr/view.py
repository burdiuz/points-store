import re
from flask import redirect, url_for, send_from_directory, current_app


def init(bp):
    @bp.route('/', methods=['GET'], defaults={'path': ''})
    @bp.route('/<path:path>', methods=['GET'])
    def view_routing(path):
        # For /api/** calls use api blueprint
        if path.startswith('api/'):
            return redirect(url_for(path))

        file_rgx = re.compile("^[^.\\/][^\\/]*\\.[A-Za-z0-9]+$")

        # If requested file with extension, return static file
        if file_rgx.search(path) is not None:
            return send_from_directory('../view/build', 'index.html')

        # For any other URL return index.html
        return send_from_directory('../view/build', 'index.html')
