from fastapi import APIRouter

router = APIRouter()

@router.get("/download")
async def download_file(file_id: str | None = None):
    return {file_id}