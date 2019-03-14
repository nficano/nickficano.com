import importlib
import pkgutil

from flask import Blueprint


def register_blueprints(app, package_name: str, package_path: str):
    """Register all Blueprint instances on the specified Flask application
    found in all modules for the specified package.

    :param app:
        the Flask application
    :param package_name:
        the package name
    :param package_path:
        the package path
    """
    for bp in get_app_blueprints(package_name, package_path):
        app.register_blueprint(bp)


def get_app_blueprints(package_name, package_path):
    for _, name, _ in pkgutil.iter_modules(package_path):
        module = importlib.import_module(f'{package_name}.{name}')
        for item in dir(module):
            item = getattr(module, item)
            if isinstance(item, Blueprint):
                yield item
