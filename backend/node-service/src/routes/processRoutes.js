import express from 'express';
import fs from 'fs';
import FormData from 'form-data';
import axios from 'axios';
import path from 'path';
const router = express.Router();

const PY_URL = process.env.PYTHON_URL || 'http://localhost:8000';

router.post('/process', async (req, res) => {
  try {
    const { filename } = req.body;
    if(!filename) return res.status(400).json({ error: 'filename required in body' });
    const fullPath = path.join('src/storage/uploads', filename);
    if(!fs.existsSync(fullPath)) return res.status(404).json({ error: 'file not found' });

    const form = new FormData();
    form.append('file', fs.createReadStream(fullPath));

    const resp = await axios.post(`${PY_URL}/process`, form, {
      headers: form.getHeaders(),
      maxContentLength: 50 * 1024 * 1024
    });
    return res.json(resp.data);
  } catch (err) {
    console.error(err?.response?.data || err.message || err);
    return res.status(500).json({ error: 'processing error', detail: err?.message });
  }
});

export default router;
