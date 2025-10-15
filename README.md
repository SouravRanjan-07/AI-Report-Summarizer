# AI-Powered Medical Report Simplifier (Minimal Demo)

This repository is a **minimal but functional** full-stack demo implementing the structure requested.

Services:
- Frontend (React + MUI) on port 3000
- Node.js API gateway on port 5000
- Python FastAPI processing on port 8000

## Quick start (using Docker)
Make sure Docker is installed, then from the project root run:

```bash
docker-compose up --build
```

Open the frontend: http://localhost:3000

## Notes
- The Python service installs `tesseract-ocr` and `poppler-utils` for OCR and PDF conversion.
- The normalization map in python is minimal for demo; extend `NORMALIZATION` and `REF_RANGES` in `backend/python-service/app/services/normalization_service.py`.
- This zip is a scaffold meant to run as-is with Docker. If you run into permission issues, ensure Docker has access to resources and you rebuilt images.
