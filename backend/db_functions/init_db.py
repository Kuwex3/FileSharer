from sqlmodel import SQLModel, create_engine
from sqlalchemy.ext.asyncio import create_async_engine

from backend.config import Settings
from backend.db_functions.models import File

engine = create_engine(Settings.sqlite_url)      

def create_db():
    SQLModel.metadata.create_all(engine)
    
async_engine = create_async_engine(Settings.async_sqlite_url)
  
async def create_async_db():
    async with async_engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)
        
create_db()