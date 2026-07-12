from fastapi import FastAPI
from backend.endpoints.upload_file import router as upRouter

app = FastAPI()

app.include_router(upRouter)

@app.get("/")
async def main():
    return {"Main":"Endpoint"}