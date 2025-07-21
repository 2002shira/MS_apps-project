import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pixabayRoutes from './routes/pixabay.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/images', pixabayRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});