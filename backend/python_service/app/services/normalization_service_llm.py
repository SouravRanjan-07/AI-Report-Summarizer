import os
import google.generativeai as genai
from dotenv import load_dotenv
import json

load_dotenv()

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

def normalize_medical_report(extracted_text: str):
    """
    Use Gemini LLM to normalize messy OCR medical report text into
    a structured JSON format and generate a clear, human summary.
    """

    model = genai.GenerativeModel("models/gemini-2.5-flash")  # ✅ use models/ prefix

    prompt = f"""
You are a clinical data analyst AI. You will receive raw OCR text from a medical report.
Your task is to:
1. Identify all tests, their values, units, and reference ranges.
2. Determine if the test result is low, normal, or high.
3. Generate a short **summary** describing abnormalities in simple English.
4. Generate a brief **explanation** for each abnormal test (why it might be high or low).
5. Return a **valid JSON only** (no markdown, no code fences).

Example output:
{{
  "patient_info": {{
    "name": "John Doe",
    "age": "30",
    "sex": "Male"
  }},
  "tests": [
    {{
      "name": "Hemoglobin",
      "value": 10.2,
      "unit": "g/dL",
      "status": "low",
      "ref_range": {{"low": 12.0, "high": 15.0}}
    }},
    {{
      "name": "WBC",
      "value": 11200,
      "unit": "/uL",
      "status": "high",
      "ref_range": {{"low": 4000, "high": 11000}}
    }}
  ],
  "summary": "Low hemoglobin (10.2 g/dL vs normal 12.0–15.0) and high WBC (11200/uL vs normal 4000–11000), indicating possible anemia and infection.",
  "explanations": [
    "Low hemoglobin may indicate anemia or nutritional deficiency.",
    "High WBC count may suggest infection or inflammation."
  ]
}}

Now process the following OCR text:

{extracted_text}
    """

    try:
        response = model.generate_content(prompt)
        output = response.text.strip()

        # Clean up accidental markdown fences
        if output.startswith("```json"):
            output = output.replace("```json", "").replace("```", "").strip()

        # Parse JSON safely
        normalized = json.loads(output)
        return normalized

    except Exception as e:
        print(f"Gemini JSON parsing failed: {e}")
        print(f"Raw model output:\n{output if 'output' in locals() else 'No response'}")
        return {
            "error": "Failed to normalize report",
            "details": str(e)
        }
