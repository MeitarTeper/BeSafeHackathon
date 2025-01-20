import { execute, fetchAll } from './dbController.js';

// יצירת טבלת משתמשים
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

// פונקציית התחברות
const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ message: "Missing username or password" });
        return;
    }

    const sql = `SELECT username FROM users WHERE username = ? AND password = ?`;
    try {
        const user = await fetchAll(sql, [username, password]);

        if (user.length > 0) {
            req.session.user = user[0];
            res.status(200).json({ message: "Successfully logged in" });
        } else {
            res.status(401).json({ message: "Invalid username or password" });
        }
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "An error occurred" });
    }
};

// פונקציית הרשמה
const signUp = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }

    try {
        // בדיקה אם שם משתמש או אימייל כבר קיימים
        const checkUserSql = `SELECT * FROM users WHERE username = ? OR email = ?`;
        const existingUsers = await fetchAll(checkUserSql, [username, email]);

        if (existingUsers.length > 0) {
            res.status(409).json({ message: "Username or email already exists" });
            return;
        }

        // הוספת משתמש חדש
        const insertUserSql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
        await execute(insertUserSql, [username, email, password]);

        req.session.user = { username }; // שמירת שם המשתמש בסשן
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error("Sign up error:", err);
        res.status(500).json({ message: "An error occurred during sign up" });
    }
};

export { login, signUp };
