import {execute, fetchAll} from './dbController.js';

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

const login = async (req, res) => {
    var {username, password} = req.body;
    const sql = `SELECT username FROM users WHERE username =? and password =?`;
    try {
        const user = await fetchAll(sql, [username, password]);
        if (user.length > 0)
        {
            req.session.user = user[0];
            res.status(200).json({ "message": "successfully logged in" });
        }
        else
        {
            res.status(401).json({ "message": "Invalid username or password" });
        }
    } catch (err) {
        console.log(err);
        res.status(501).json({ "message": err });
    }
};


const signUp = async (req, res) => {
    try{
        var { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ "message": "Missing required fields" });
            return;
        }

        const sql1 = `SELECT * FROM users WHERE username =?`;
        const user = await fetchAll(sql1, [username]);
        if (user.length != 0)
        {
            res.status(401).json({ "message": "user exists" });
            return;
        }

        console.log("Adding user: " + username + " " + password);
        const sql2 = `INSERT INTO users (username, password) VALUES(?, ?)`;
        await execute(sql2, [username, password]);
        req.session.user = username;
        res.status(201).json({ "message": "user added successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(501).json({ "message": err });
    }
};

export {
    login,
    signUp
};

