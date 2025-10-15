import express from 'express';
import multer from 'multer';
import path from 'path';
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'src/storage/uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });
router.post('/upload', upload.single('file'), (req, res) => {
  if(!req.file) return res.status(400).json({ error: 'No file' });
  res.json({ filename: req.file.filename, path: req.file.path });
});
export default router;
