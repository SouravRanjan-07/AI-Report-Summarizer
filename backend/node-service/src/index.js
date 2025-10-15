import express from 'express';
import cors from 'cors';
import uploadRoutes from './routes/uploadRoutes.js';
import processRoutes from './routes/processRoutes.js';
import healthRoutes from './routes/healthRoutes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', uploadRoutes);
app.use('/api', processRoutes);
app.use('/api', healthRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Node service listening on ${PORT}`));
