import api from './api';

const addLesson = async (newFile) => {
    var response = {}
    try {
        response = (await api.post('/lessons', newFile));
    } catch (error) {
        console.log('Error adding lesson:', error);
    }
    return response;
}

const getLessons = async () => {
    var response = {}
    try {
        response = (await api.get('/lessons')).data;
    } catch (error) {
        console.log('Error geting lessons:', error);
    }
    return response;
}

export { addLesson, getLessons};