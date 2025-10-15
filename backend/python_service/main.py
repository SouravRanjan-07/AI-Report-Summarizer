from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import tempfile, shutil, os
from dotenv import load_dotenv
load_dotenv()


# Local imports
from app.services.ocr_service import process_file_extract_text
from app.services.normalization_service_llm import normalize_medical_report

# -----------------------------------
# FastAPI setup
# -----------------------------------
app = FastAPI(title="Medical Report Simplifier")

# Enable CORS (to allow frontend to talk to backend)
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------------
# Upload & Process Route
# -----------------------------------
@app.post("/process")
async def process(file: UploadFile = File(...)):
    tmpdir = tempfile.mkdtemp()
    try:
        path = os.path.join(tmpdir, file.filename)

        # Step 1: Save uploaded file
        with open(path, "wb") as f:
            f.write(await file.read())

        # Step 2: Extract text using OCR
        extracted_text = process_file_extract_text(path)
        print("Extracted Text:", extracted_text)

        if not extracted_text:
            return JSONResponse(
                status_code=400,
                content={"status": "unprocessed", "reason": "no text extracted"}
            )

        # Step 3: Normalize using Gemini LLM
        normalized = normalize_medical_report(extracted_text)

        # Step 4: Return structured output
        return {
            "status": "ok",
            "extracted_text": extracted_text,
            "normalized": normalized
        }

    finally:
        shutil.rmtree(tmpdir, ignore_errors=True)

# -----------------------------------
# Run app
# -----------------------------------
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
