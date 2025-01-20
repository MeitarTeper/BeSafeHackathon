import {execute, fetchAll} from '../models/db.js';
import { validateUserCredentials, addUser, checkUserExists} from '../models/userModel.js';

try {
    await execute(
        `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL)`
    );
} catch (error) {
    console.error("Error creating table:", error);
}

// const login = async (req, res) => {
//     var {username, password} = req.body;
//     const sql = `SELECT username FROM users WHERE username =? and password =?`;
//     try {
//         const user = await fetchAll(sql, [username, password]);
//         console.log(user);
//         if (user.length > 0)
//         {
//             req.session.user = user[0];
//             res.status(200).json({ "message": "successfully logged in" });
//         }
//         else
//         {
//             res.status(401).json({ "message": "Invalid username or password" });
//         }
//     } catch (err) {
//         console.log(err);
//         res.status(501).json({ "message": err });
//     }
// };

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await validateUserCredentials(username, password);
        console.log(user);

        if (user.length > 0) {
            req.session.user = user[0];
            res.status(200).json({ message: 'Successfully logged in' });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (err) {
        console.error(err);
        res.status(501).json({ message: 'Error during login' });
    }
};


// const signUp = async (req, res) => {
//     try{
//         var {username, password} = req.body;
//         if (!username || !password) {
//             res.status(400).json({ "message": "Missing required fields" });
//             return;
//         }

//         const sql1 = `SELECT * FROM users WHERE username =?`;
//         const user = await fetchAll(sql1, [username]);
//         if (user.length != 0)
//         {
//             res.status(401).json({ "message": "user exists" });
//             return;
//         }

//         console.log("Adding user: " + username + " " + password);
//         const sql2 = `INSERT INTO users (username, password) VALUES(?, ?)`;
//         await execute(sql2, [username, password]);
//         req.session.user = username;
//         res.status(201).json({ "message": "user added successfully" });
//     }
//     catch (err) {
//         console.log(err);
//         res.status(501).json({ "message": err });
//     }
// };

const signUp = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }

        // Check if the user already exists
        const userExists = await checkUserExists(username);
        if (userExists) {
            res.status(401).json({ message: 'User already exists' });
            return;
        }

        // Add the new user
        console.log('Adding user:', username);
        await addUser(username, password);

        req.session.user = username; // Start a session for the new user
        res.status(201).json({ message: 'User added successfully' });
    } catch (err) {
        console.error(err);
        res.status(501).json({ message: 'Error during sign up' });
    }
};

export { login, signUp };
