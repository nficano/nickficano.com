"""
nickficano.factory
------------------

Implementation of the Flask application factory pattern.
"""
import os
from typing import Optional

from flask import Flask

from server.lib.blueprints import register_blueprints


def create_app(
        package_name: str,
        package_path: str,
        settings_override: Optional[object] = None,
) -> Flask:
    """Returns a application instance configured with functionality specific to
    the platform.

    :param package_name:
        application package name.
    :param package_path:
        application package path.
    :param settings_override:
        a dictionary of settings to override.
    """
    cwd = os.path.dirname(os.path.abspath(__file__))
    static_folder = os.path.abspath(
        os.path.join(cwd, '..', 'client', 'static'),
    )
    app = Flask(
        package_name,
        instance_relative_config=True,
        static_folder=static_folder,
        static_url_path='/static',
    )

    # Apply base configuration.
    app.config.from_object('server.config.settings')

    # Apply configuration passed down from the app instance.
    app.config.from_object(settings_override)

    # Apply environment configuration from ../instance/overrides.py
    app.config.from_pyfile('overrides.py', silent=True)

    # Automatically find and register all Blueprint instances on the specified
    # Flask application found in all modules for the specified package.
    register_blueprints(app, package_name, package_path)

    return app
