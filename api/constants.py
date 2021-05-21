import os
from dotenv import load_dotenv

BASEDIR = os.path.abspath(os.path.dirname(__file__))
DB_HOST = "localhost"
DB_PORT = "5432"
DB_NAME = "test"
PATH_TO_DOTENV = os.path.join(BASEDIR, '.env')

load_dotenv(PATH_TO_DOTENV)
database_user = os.environ.get('POSTGRE_SQL_USER', 'postgres')
database_password = os.environ.get('POSTGRE_SQL_PASSWORD', 'postgres')

DB_URL = f"postgresql://{database_user}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
