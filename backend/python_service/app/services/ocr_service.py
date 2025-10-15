import os, re
from pdf2image import convert_from_path
from PIL import Image
import pytesseract

def process_file_extract_text(path):
    ext = os.path.splitext(path)[1].lower()
    if ext == '.txt':
        return open(path, 'r', encoding='utf-8', errors='ignore').read()
    if ext in ['.jpg', '.jpeg', '.png', '.tif', '.tiff']:
        return pytesseract.image_to_string(Image.open(path))
    if ext == '.pdf':
        pages = convert_from_path(path, dpi=200)
        texts = []
        for p in pages:
            texts.append(pytesseract.image_to_string(p))
        return '\n'.join(texts)
    # fallback
    return ''
