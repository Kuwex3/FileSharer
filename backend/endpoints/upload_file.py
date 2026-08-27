from fastapi import APIRouter, UploadFile
import aiofiles
from backend.config import Settings

router = APIRouter()

max_size = Settings.size_limit

@router.post("/upload")
async def test_router(user_file: UploadFile):
    if user_file.size <= max_size:
        async with aiofiles.open(f"./backend/test_storage/{user_file.filename}", "wb") as file:
            while chunk := await user_file.read(1024 * 1024):
                await file.write(chunk)
            return {"Success"}
    else:
        return {"denied"}