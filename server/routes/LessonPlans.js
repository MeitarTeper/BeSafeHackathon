const lessonPlansController = require("../controllers/LessonPlansController")
const express = require('express');
var router = express.Router();

router.route('/')
            .get(lessonPlansController.getLessons)
            .post(lessonPlansController.addLesson)

// router.route('/:id')
//             .get