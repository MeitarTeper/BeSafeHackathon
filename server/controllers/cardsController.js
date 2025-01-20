const getCards = (req, res) => {
    const cards = [
      { text: "אל תשתף כתובת בית", type: "danger" },
      { text: "סיסמה חזקה כוללת מספרים ותווים", type: "safe" },
      { text: "אל תלחץ על קישורים לא מוכרים", type: "danger" },
      { text: "דווח על בריונות רשת", type: "safe" },
      { text: "שמור על הפרטיות שלך ברשת", type: "safe" },
      { text: "זהה ניסיונות פישינג", type: "danger" },
      { text: "אל תמסור מידע אישי באינטרנט", type: "danger" },
    ];
    res.json(cards);
  };
  
  module.exports = { getCards };
  