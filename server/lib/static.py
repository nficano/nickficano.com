import json
import os

import server


def read_manifest():
    dirname = os.path.dirname(server.__file__)
    fp = os.path.join(dirname, '..', 'manifest.json')
    with open(fp) as fh:
        return {
            k: os.path.basename(v)
            for k, v in json.loads(fh.read()).items()
        }


def load_file(name):
    basename, ext = name.split('.')
    manifest = read_manifest()
    static_asset = manifest[name]
    dirname = os.path.dirname(server.__file__)
    fp = os.path.join(dirname, '..', 'client', 'static', ext, static_asset)
    with open(fp) as fh:
        return fh.read().strip()


def get_static_assets():
    return {
        k: {
            'filename': v,
            'raw': load_file(k),
        } for k, v in read_manifest().items()
    }
