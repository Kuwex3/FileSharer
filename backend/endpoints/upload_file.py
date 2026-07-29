from fastapi import APIRouter, UploadFile

router = APIRouter()

@router.post("/upload")
async def test_router(user_file: UploadFile):
    if user_file.size < 100000000000000000000000000000000000:
        data = await user_file.read()
        file_name = user_file.filename
        with open(f"backend/test_storage/{file_name}", "wb") as file:
            file.write(data)
    else:
        return {"access": "denied"}