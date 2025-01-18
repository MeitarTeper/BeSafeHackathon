import express from 'express';
import {
    addScore,
    getScores
} from '../controllers/scoreController.js';

const router = express.Router();

router.post('/add', addScore)
router.get('/get', getScores)

export default router;