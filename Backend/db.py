import os
from dotenv import load_dotenv
from sqlalchemy import create_engine

load_dotenv(override=True)

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError("DATABAS_URL is not set in .env")

engine = create_engine(DATABASE_URL, pool_pre_ping=True)

def get_db():
    with engine.connect() as conn: yield conn