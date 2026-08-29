from sqlmodel.ext.asyncio.session import AsyncSession

from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.asyncio import create_async_engine

from backend.config import Settings
    
async_engine = create_async_engine(Settings.async_sqlite_url)
          
async_session_maker = sessionmaker(
    async_engine, class_=AsyncSession, expire_on_commit=False
)    
    
async def get_async_session():
    async with async_session_maker() as async_session:
        yield async_session