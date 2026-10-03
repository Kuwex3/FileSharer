from fastapi import APIRouter, UploadFile, Depends, HTTPException
import aiofiles

from config import Settings
from db_functions.main import get_async_session
from db_functions.models import File

router = APIRouter()

max_size = Settings.size_limit

@router.post("/upload")
async def test_router(user_file: UploadFile, session = Depends(get_async_session)):
    if user_file.size <= max_size:
        async with aiofiles.open(f"./test_storage/{user_file.filename}", "wb") as file:
            while chunk := await user_file.read(1024 * 1024):
                await file.write(chunk)
        file_for_add = File(file_name = user_file.filename, size = user_file.size)
        
        session.add(file_for_add)
        await session.commit()
        await session.refresh(file_for_add)
        return {"file_id": file_for_add.id}
    else:
        raise HTTPException(status_code=413, detail="File too large")