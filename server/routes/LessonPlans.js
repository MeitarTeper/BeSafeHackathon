import express from 'express';
import { getLessons, addLesson } from '../controllers/LessonPlansController.js';
const router = express.Router();

router.route('/')
            .get(getLessons)
            .post(addLesson)

// router.route('/:id')
//             .get

export default router;