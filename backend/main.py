from fastapi import FastAPI
from backend.endpoints.upload_file import router as uploadRouter
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True, #RM AFTER TESTS
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(uploadRouter)

@app.get("/")
async def main():
    return {"Base":"Endpoint."}