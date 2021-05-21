from tornado.web import Application
from tornado.ioloop import IOLoop
from .constants import DB_URL
from tornado_sqlalchemy import SQLAlchemy
from .views import DataHandler

db = SQLAlchemy(DB_URL)


def make_app():
    urls = [
        ("/data", DataHandler)
    ]
    return Application(urls, db=db, debug=True)


if __name__ == '__main__':
    app = make_app()
    app.listen(3000)
    IOLoop.instance().start()
