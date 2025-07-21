import express from 'express';
import { getImages } from '../controllers/pixabay.controller.js';

const router = express.Router();

router.get('/', getImages);

export default router;