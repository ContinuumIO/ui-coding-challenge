import os
import logging

import tornado
from tornado.web import RequestHandler, Application


class IndexHandler(RequestHandler):
    def get(self):
        self.render("index.html")


class GameListHandler(RequestHandler):
    def get(self):
        """List all known games"""
        pass

    def post(self):
        """Create a new game"""
        pass


class GameByIDHandler(RequestHandler):
    def get(self, game_id):
        """Return a game based on its ID"""
        pass

    def post(self, game_id):
        """Overwrite a game based on its ID"""
        pass


CURRENT_DIR = os.path.dirname(__file__)


def run(port=8080, debug=False):
    handlers = [
        (r"/", IndexHandler),
        (r"/api/games", GameListHandler),
        (r"/api/games/([^/]+)", GameByIDHandler),
    ]
    app = Application(
        handlers,
        cookie_secret=os.urandom(16),
        template_path=os.path.join(CURRENT_DIR, 'templates'),
        static_path=os.path.join(CURRENT_DIR, '..', 'ui', 'static'),
        xsrf_cookies=False,
        debug=debug)

    app.listen(port)
    tornado.ioloop.IOLoop.current().start()
