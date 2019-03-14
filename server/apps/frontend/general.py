from flask import Blueprint
from flask import current_app as app
from flask import render_template
from flask import send_from_directory

from server.lib.routing import route

bp = Blueprint('index', __name__)


@route(bp, '/')
def index():
    return render_template('index.j2')


@route(bp, '/robots.txt')
def robots():
    return send_from_directory(app.static_folder, 'robots.txt')


@route(bp, '/sitemap.xml')
def sitemap():
    return send_from_directory(app.static_folder, 'sitemap.xml')


@route(bp, '/offline.html')
def offline():
    return send_from_directory(app.static_folder, 'offline.html')


@route(bp, '/favicon.ico')
def favicon():
    return send_from_directory(app.static_folder, 'images/favicon.ico')


@route(bp, '/service-worker.js')
def service_worker():
    return send_from_directory(app.static_folder, 'js/service-worker.js')


@route(bp, '/apple-touch-icon.png')
def apple_touch_icon():
    return send_from_directory(
        app.static_folder,
        'images/icons/apple-touch-icon.png',
    )
