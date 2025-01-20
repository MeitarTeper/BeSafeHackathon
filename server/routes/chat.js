import express from "express";

const router = express.Router();

// Route to handle chat messages
router.post("/", (req, res) => {
  const userMessage = req.body.message.toLowerCase();

  let botResponse = "אני כאן לעזור, אבל לא הצלחתי להבין את הבקשה שלך.";
  if (userMessage.includes("חרם")) {
    botResponse = "אם עובר עליך חרם, חשוב לשתף מבוגר אחראי כמו יועץ או מורה. אתה לא לבד.";
  } else if (userMessage.includes("פישינג")) {
    botResponse = "שימי לב לא ללחוץ על קישורים חשודים ולוודא את מקור ההודעה.";
  } else if (userMessage.includes("בדידות")) {
    botResponse = "אם את מרגישה לבד, שתפי חברים או מבוגר שאת סומכת עליו. תמיד יש מישהו שיקשיב.";
  } else if (userMessage.includes("בריונות")) {
    botResponse = "אם את חווה בריונות, שתפי את המורה, יועץ בית הספר, או הורים. זה חשוב מאוד.";
  } else if (userMessage.includes("עזרה")) {
    botResponse = "אם את זקוקה לעזרה, דברי עם אדם קרוב, או צרי קשר עם יועץ מקצועי.";
  }
 

  res.json({ response: botResponse });
});

export default router;