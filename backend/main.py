from fastapi import FastAPI
from backend.endpoints.upload_file import router as uploadRouter

app = FastAPI()

app.include_router(uploadRouter)

@app.get("/")
async def main():
    return {"Main":"Endpoint"}