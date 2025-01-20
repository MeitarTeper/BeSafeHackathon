import {execute, fetchAll} from './db.js';

try {
    await execute(
        `CREATE TABLE IF NOT EXISTS lessons (
        id INTEGER PRIMARY KEY,
        fileName TEXT NOT NULL,
        lessonName TEXT NOT NULL,
        ageGroup TEXT NOT NULL,
        time TEXT NOT NULL,
        url TEXT NOT NULL,
        previewPhoto TEXT NOT NULL)`
    );
    } catch (error) {
        console.log(error);
    }

    const getLessons = async () => {
        const sql = `SELECT * FROM lessons`;
        const lessons = await fetchAll(sql);
        return lessons;
    };

const addLesson = async (id, fileName, lessonName, ageGroup, time, url, previewPhoto) => {
    console.log("add lesson func");
    const sql = `
    INSERT INTO lessons (id, fileName, lessonName, ageGroup, time, url, previewPhoto)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
    await execute(sql, [id, fileName, lessonName, ageGroup, time, url, previewPhoto]);
};

export {getLessons, addLesson};


