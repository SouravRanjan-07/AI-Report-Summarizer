# Medical Report Simplifier

An AI-powered web application that extracts, interprets, and simplifies medical reports using **OCR (Optical Character Recognition)** and **Google Gemini LLM**.

---

##  Overview

The **Medical Report Simplifier** is designed to make complex medical reports easy to understand for patients.
You can upload a scanned image or PDF of a report, and the system:

1. **Extracts the text** from the report using OCR.
2. **Processes and normalizes** the extracted data using the **Gemini Large Language Model**.
3. **Presents the data** in a structured, readable, and human-friendly summary.

 Example:
If you upload a _Kidney Function Test (KFT)_ report —
the system identifies all parameters (like Urea, Creatinine, Sodium, etc.),
highlights what’s normal or abnormal, and explains the findings in simple words.

---

##  Tech Stack

### Frontend

- **React.js (Vite)** – Modern fast frontend framework
- **Material-UI (MUI)** – For responsive, clean UI
- **Axios** – For making API calls to backend

###  Backend

- **FastAPI (Python)** – High-performance API framework
- **Google Generative AI (Gemini API)** – For text understanding and summarization
- **pytesseract / easyocr** – For OCR-based text extraction
- **dotenv** – For securely loading environment variables

###  AI Model

- **Gemini 2.5 Flash / Pro** – Used to normalize and interpret medical text

---

## Architecture / Workflow

Here’s the full **data flow** of the project �

```
[ User Uploads Medical Report (PDF/JPG/PNG) ]
                  |
                  v
        ┌──────────────────────────────┐
        │         Frontend (React)     │
        │ - FileUploader.jsx uploads   │
        │ - Sends to FastAPI backend   │
        └──────────────────────────────┘
                  |
                  v
        ┌──────────────────────────────┐
        │         Backend (FastAPI)    │
        │ 1️⃣ Save uploaded file        │
        │ 2️⃣ Extract text via OCR      │
        │ 3️⃣ Normalize with Gemini API │
        │ 4️⃣ Return structured JSON    │
        └──────────────────────────────┘
                  |
                  v
        ┌──────────────────────────────┐
        │       Frontend (React)       │
        │ - Displays readable summary  │
        │ - Shows normal/abnormal data │
        └──────────────────────────────┘
```

---

##  Folder Structure

### 🔹 Backend (FastAPI)

```
python_service/
│
├── app/
│   ├── services/
│   │   ├── ocr_service.py
│   │   └── normalization_service_llm.py
│   └── __init__.py
│
├── main.py
├── requirements.txt
├── .env
└── .gitignore
```

###  Frontend (React + Vite)

```
frontend/
│
├── src/
│   ├── components/
│   │   ├── FileUploader.jsx
│   │   └── ResultViewer.jsx
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── vite.config.js
├── .env
└── .gitignore
```

---

##  Installation & Setup

###  Backend Setup

1. Navigate to backend folder

   ```bash
   cd backend/python_service
   ```

2. Create & activate virtual environment

   ```bash
   python -m venv venv
   source venv/Scripts/activate    # On Windows: venv\Scripts\activate
   ```

3. Install dependencies

   ```bash
   pip install -r requirements.txt
   ```

4. Create `.env` file

   ```bash
   GEMINI_API_KEY=your_google_gemini_api_key
   ```

5. Run backend

   ```bash
   uvicorn main:app --reload
   ```

    Backend will run at: `http://localhost:8000`

---

###  Frontend Setup

1. Navigate to frontend folder

   ```bash
   cd frontend
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start development server

   ```bash
   npm run dev
   ```

    Frontend will run at: `http://localhost:5173`

---

## 🔗 API Endpoint

**POST** `/process`
Uploads a medical report file and returns structured + simplified output.

**Example Response:**

```json
{
  "status": "ok",
  "extracted_text": "...",
  "normalized": {
    "patient_info": {
      "name": "Yashvi M. Patel",
      "age": "21 Years",
      "sex": "Female"
    },
    "tests": [
      {
        "test_name": "Urea",
        "value": "16.00 mg/dl",
        "status": "Normal"
      }
    ],
    "summary": "All parameters are within normal range.",
    "explanation": "No immediate medical concern detected."
  }
}
```

---

##  Features

 Upload medical reports (image, PDF, or text)
 OCR text extraction
 Automatic data structuring (test name, value, reference range)
 Gemini-based AI interpretation
 Clear summary with normal/abnormal highlights
 Frontend-backend integration
 Modern responsive UI

---

## 📸 Demo (Optional)

> _(You can add screenshots here — e.g., upload box, structured output, summary view)_

---

## Environment Variables

| Key              | Description                       |
| ---------------- | --------------------------------- |
| `GEMINI_API_KEY` | Your Google Generative AI API key |
| `FASTAPI_PORT`   | (Optional) Port for backend       |

---

## 🧾 Future Improvements

- Add user authentication
- Store report history
- Add multilingual explanation
- Deploy on cloud (Render / Vercel / HuggingFace Spaces)

---

## Contributors

- **Sourav Ranjan Nayak** — Developer & Project Creator

---


