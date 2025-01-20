import { getLessons as getLessonsModel, addLesson as addLessonModel } from '../models/LessonPlansModel.js';

const addLesson = async (req, res) => {
    const { id, fileName, lessonName, ageGroup, time, url, previewPhoto } = req.body;
    try {
        console.log(req.body);
        addLessonModel(id, fileName, lessonName, ageGroup, time, url, previewPhoto);
        console.log("Lesson added successfully!");
        res.status(200).json({message: "lesson added successfully"});
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: err });
    }
};

const getLessons = async (req, res) => {
    try {
        res.json(await getLessonsModel());
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }   
}

export {addLesson, getLessons};