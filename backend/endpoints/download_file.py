from fastapi import APIRouter, Depends
from fastapi.responses import FileResponse

from db_functions.main import get_async_session
from db_functions.models import File

from sqlmodel import select

router = APIRouter()

@router.get("/api/getInfo")
async def get_info(file_id: str, session = Depends(get_async_session)):
    if file_id:
        stmnt = select(File).where(File.id == file_id)
        list_results = await session.exec(stmnt)
        result = list_results.all()
        return File(id=result[0].id, file_name=result[0].file_name, size=result[0].size)

@router.get("/api/download")
async def download_file(file_id: str | None = None, session = Depends(get_async_session)):
    if file_id == None:
        return {"No file to response"}
    
    stmnt = select(File).where(File.id == file_id)
    result = await session.exec(stmnt)
    
    file_name = result.all()[0].file_name
    
    file = FileResponse(
        path=f"./test_storage/{file_name}",
        filename=file_name
    )
    return file