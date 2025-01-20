CREATE TABLE cards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    type TEXT NOT NULL
);

INSERT INTO cards (text, type) VALUES
('אל תשתף כתובת בית', 'danger'),
('סיסמה חזקה כוללת מספרים ותווים', 'safe'),
('אל תלחץ על קישורים לא מוכרים', 'danger'),
('דווח על בריונות רשת', 'safe'),
('שמור על הפרטיות שלך ברשת', 'safe'),
('זהה ניסיונות פישינג', 'danger'),
('אל תמסור מידע אישי באינטרנט', 'danger');
