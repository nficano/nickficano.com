from flask_restful import reqparse
from flask_restful import Resource
from pyicloud import PyiCloudService
from pyicloud.exceptions import PyiCloudFailedLoginException

from server.core import api


@api.resource('/icloud/fmi')
class FindMyIphone(Resource):
    def get_iphones(self, api):
        for device in api.devices:
            data = device.data
            if all([
                data['deviceClass'] == 'iPhone',
                data['isLocating'] is True,
            ]):
                yield device

    def post(self):
        opts = (
            reqparse.RequestParser()
            .add_argument('apple_id', type=str)
            .add_argument('password', type=str)
            .parse_args()
        )
        try:
            api = PyiCloudService(opts.apple_id, opts.password)
            for iphone in self.get_iphones(api):
                iphone.play_sound()
            return {'ok': True, 'error': None}
        except PyiCloudFailedLoginException as e:
            return {'ok': False, 'error': e.args[0]}
