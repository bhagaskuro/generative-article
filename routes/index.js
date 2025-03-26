import express from 'express';
import Controller from '../controllers/index.js';

const router = express.Router();

router.post('/', Controller.request);

export default router;
