from tornado_sqlalchemy import declarative_base
from sqlalchemy import Column, DateTime, String, Integer, Float
from .constants import DB_URL
import datetime

Base = declarative_base()


class Info(Base):
    __tablename__ = "info"

    id = Column(Integer, primary_key=True, unique=True)
    date = Column(DateTime)
    name = Column(String)
    amount = Column(Integer)
    distance = Column(Float)

    types = {
        "date": datetime.datetime,
        "name": str,
        "amount": int,
        "distance": float}

    def to_json(self):
        return {
            "date": datetime.datetime.strftime(self.date, '%Y-%m-%d %H:%M:%S.%f'),
            "name": self.name,
            "amount": self.amount,
            "distance": self.distance
        }


def validate(input_data, input_types):
    for el in input_types:
        if input_types[el] == datetime.datetime:
            try:
                input_data[el] = datetime.datetime.strptime(
                    input_data[el], '%Y-%m-%d %H:%M:%S.%f')
            except ValueError:
                return False
        elif not isinstance(input_data[el], input_types[el]):
            return False
    return True
