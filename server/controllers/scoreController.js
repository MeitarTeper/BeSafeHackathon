import sqlite3 from "sqlite3";

const db = new sqlite3.Database("scores.db");

const execute = async (db, sql, params = []) => {
    if (params && params.length > 0) {
      return new Promise((resolve, reject) => {
        db.run(sql, params, (err) => {
          if (err) reject(err);
          resolve();
        });
      });
    }
    return new Promise((resolve, reject) => {
      db.exec(sql, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  };

const fetchAll = async (db, sql, params) => {
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  };

try {
await execute(
    db,
    `CREATE TABLE IF NOT EXISTS scores (
    id INTEGER PRIMARY KEY,
    playerName TEXT NOT NULL,
    gameName TEXT NOT NULL,
    score INTEGER NOT NULL)`
);
} catch (error) {
    console.log(error);
}

const addScore = async (req, res) => {
    try{
        var { playerName, gameName, score } = req.body;
        if (!playerName || !gameName || !score) {
            res.status(400).json({ "error": "Missing required fields" });
            return;
        }
        console.log("Adding row: " + playerName + " " + gameName + " " + score);
        const sql = `INSERT INTO scores(playerName, gameName, score) VALUES(?, ?, ?)`;
        try {
            await execute(db, sql, [playerName, gameName, score]);
            res.status(201).json({ "message": "Score added successfully" });
        } catch (err) {
            console.log(err);
            res.status(501).json({ "error": err });
        }
    }
    catch (err) {
        console.log(err);
        res.status(501).json({ "error": err });
    }
};

const getScores = async (req, res) => {
    const gameName = req.query.gameName;
    const sql = `SELECT * FROM scores WHERE gameName =? ORDER BY score DESC LIMIT 10`;
    try {
        const scores = await fetchAll(db, sql, [gameName]);
        res.status(200).json({ scores });
    } catch (err) {
        console.log(err);
        res.status(501).json({ "error": err });
    }
};

export {
    addScore,
    getScores
};
