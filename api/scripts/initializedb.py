from sqlalchemy import engine_from_config
from ..constants import DB_URL, PATH_TO_DOTENV
from ..models import Base
from dotenv import load_dotenv
import os


def main():
    load_dotenv(PATH_TO_DOTENV)
    settings = {'sqlalchemy.url': DB_URL}
    engine = engine_from_config(settings, prefix='sqlalchemy.')
    if bool(os.environ.get('DEBUG', '')):
        Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)


if __name__ == '__main__':
    main()
