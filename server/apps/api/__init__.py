"""
nickficano.apps.api
-------------------

API application instance using Flask's factory pattern.
"""
import os
from typing import Optional

import simplejson as json
from flask import make_response

from server import factory
from server.core import api


def create_app(settings_override: Optional[object] = None):
    """Returns the frontend application instance"""
    cwd = os.path.dirname(os.path.abspath(__file__))
    package_path = [cwd]

    app = factory.create_app(
        __name__,
        package_path,
        settings_override,
    )

    api.errors = {}
    api.init_app(app)
    return app


@api.representation('application/json')
def output_json(data, code, headers=None):
    _headers = headers or {}
    if code == 204:
        resp = make_response(None, 204)
    else:
        resp = make_response(
            json.dumps(data, sort_keys=True),
            code,
        )
    resp.headers.extend(_headers)
    return resp
