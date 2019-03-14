"""
nickficano.lib.routing
----------------------

This module contains various application routing abstractions.
"""
from functools import wraps


def route(bp, *args, **kwargs):
    """This decorator should encapsulate all the authorization and
    authentication for global use.
    """
    kwargs.setdefault('strict_slashes', False)

    def decorator(func):
        @bp.route(*args, **kwargs)
        @wraps(func)
        def wrapper(*args, **kwargs):
            return func(*args, **kwargs)
        return func
    return decorator
