from fastapi import APIRouter, UploadFile, Request, Response

router = APIRouter()


@router.post("/upload")
async def test_router(request: Request):
    total_bytes = 0
    with open("./backend/test_storage/12.mp3", "ab") as file:
        async for chunk in request.stream():
            file.write(chunk)
            print(f"collected chunks: {total_bytes}")
        return {"test"}

# @router.post("/upload")
# async def test_router(user_file: UploadFile):
#     if user_file.size < 100000000000000000000000000000000000:
#         data = await user_file.read()
#         file_name = user_file.filename
#         with open(f"backend/test_storage/{file_name}", "wb") as file:
#             file.write(data)
#     else:
#         return {"access": "denied"}