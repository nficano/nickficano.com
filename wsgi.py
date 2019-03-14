from werkzeug.wsgi import DispatcherMiddleware

from server.apps import api
from server.apps import frontend

# This is the entry point for callable or entry point function for uwsgi.
application = DispatcherMiddleware(
    frontend.create_app(), {
        '/api': api.create_app(),
    },
)
