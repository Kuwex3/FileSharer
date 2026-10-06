# FileSharer

## 🖼️Preview
### MainPage:
<img src="./assets/main_page.png" alt="Applications screenshot" width="700" />

### UploadPage:
<img src="./assets/upload_page.png" alt="Applications screenshot" height="400" />

### DownloadPage:
<img src="./assets/download_page.png" alt="Applications screenshot" height="400" />

## 🚀QuickStart
## Backend
``` Bash
cd backend
python -m venv .venv
# Linux/MacOS:
source .venv/bin/activate
# Windows:
.venv/scripts/activate
pip install -r requirements.txt
python -m db_functions.init_db
uvicorn main:app
```
## Frontend
``` Bash
cd frontend
npm install
# Create .env file in ./frontend with next format:
# VITE_API_URL=http://localhost:8000
npm run dev
```
## 🐳You also can run project in docker
### !!!Before this create db file in "./backend/"!!! 
``` Bash
docker compose up
```