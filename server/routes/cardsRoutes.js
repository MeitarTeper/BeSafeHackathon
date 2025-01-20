// routes/cardsRoutes.js
import express from 'express';
const router = express.Router();

// נתונים לדוגמה
const cards = [
  { text: "אל תשתף כתובת בית", type: "danger" },
  { text: "סיסמה חזקה כוללת מספרים ותווים", type: "safe" },
  { text: "אל תלחץ על קישורים לא מוכרים", type: "danger" },
  { text: "דווח על בריונות רשת", type: "safe" },
  { text: "שמור על הפרטיות שלך ברשת", type: "safe" },
  { text: "זהה ניסיונות פישינג", type: "danger" },
];

// מחזיר את כל הנתונים
router.get('/', (req, res) => {
  res.json([...cards, ...cards]); // יוצר כפילות לכל כרטיס כדי שיהיו זוגות
});

export default router;
