const LessonPlan = require('../models/')

const addLesson = async (req, res) => {
    const { id, fileName, lessoName, ageGroup, time, url, previewPhoto } = req.body;
    const lesson = 
    res.json(lesson)
};

const getLessons = async (req, res) => {
    try {
        res.json(await postService.iteratePosts(activeUserEmail));
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
    
}