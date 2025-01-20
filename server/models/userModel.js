import {execute, fetchAll} from './db.js';

try {
    await execute(
        `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        username TEXT NOT NULL,
        password TEXT NOT NULL)`
    );
    } catch (error) {
        console.log(error);
    }

    const validateUserCredentials = async (username, password) => {
        const sql = `SELECT username FROM users WHERE username = ? AND password = ?`;
        try {
            const user = await fetchAll(sql, [username, password]);
            return user; // Return the result directly
        } catch (err) {
            console.error('Error validating user credentials:', err);
            throw err; // Pass the error up for handling in the controller
        }
    };

    // Check if the user already exists
    const checkUserExists = async (username) => {
        const sql = `SELECT * FROM users WHERE username = ?`;
        try {
            const user = await fetchAll(sql, [username]);
            return user.length > 0; // Return true if the user exists
        } catch (err) {
            console.error('Error checking user existence:', err);
            throw err;
        }
    };

    // Add a new user
    const addUser = async (username, password) => {
        const sql = `INSERT INTO users (username, password) VALUES(?, ?)`;
        try {
            await execute(sql, [username, password]);
        } catch (err) {
            console.error('Error adding user:', err);
            throw err;
        }
    };

    export { validateUserCredentials, checkUserExists, addUser};