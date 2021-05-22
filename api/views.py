from tornado.web import RequestHandler
from tornado_sqlalchemy import SessionMixin
from .models import Info, validate
import datetime
import json


class DataHandler(SessionMixin, RequestHandler):

    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')

    def post(self):
        data = json.loads(self.request.body)
        if 'name' and 'date' and 'amount' and 'distance' in data:
            # Validation of input having same types as DB columns
            if validate(data, Info.types):

                obj = Info(name=data["name"], date=data["date"],
                           amount=data["amount"], distance=data["distance"])
                with self.make_session() as session:
                    session.add(obj)
                    session.commit()
                    self.write(obj.to_json())
                    self.set_status(201)
                    return

        self.set_status(400)

    def get(self):
        info_json = []
        with self.make_session() as session:
            info = session.query(Info).all()
            for item in info:
                info_json.append(item.to_json())
        self.write({"data": info_json})
