from sqlmodel import SQLModel, Field, create_engine, Session
from backend.config import Settings

class File(SQLModel, table=True):
    id: int = Field(primary_key=True, nullable=False)
    file_name: str = Field(unique=True, min_length=5, nullable=False)
    size: int = Field(nullable=False)
    
engine = create_engine(Settings.sqlite_url)

def create_db():
    SQLModel.metadata.create_all(engine)
    
create_db()

def get_session():
    with Session(engine) as session:
        yield session