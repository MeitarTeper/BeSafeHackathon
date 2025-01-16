import React, { useState } from "react";
import styles from "./PhishingHunter.module.css";

const messages = [
  { id: 1, text: "וואו! זכית במנוי חינם לכל החיים למשחק Minecraft! לחץ כאן כדי לדרוש את הפרס שלך.", isPhishing: true },
  { id: 2, text: "מישהו פרסם תמונה שלך בקבוצה! לחץ כאן כדי לראות.", isPhishing: true },
  { id: 3, text: "נזכרת שהיום שיעור ספורט? אל תשכח להביא נעלי ספורט.", isPhishing: false },
  { id: 4, text: "החשבון שלך ב-Roblox נסגר זמנית. לחץ כאן כדי לשחזר אותו.", isPhishing: true },
  { id: 5, text: "חבר שלך שלח לך קובץ: חופשה_בפארק.zip.", isPhishing: false },
  { id: 6, text: "חדש! קבל חבילה עם 1,000 V-Bucks חינם ב-Fortnite! לחץ כאן עכשיו.", isPhishing: true },
  { id: 7, text: "תזכורת: מחר הטיול השנתי. אל תשכח להביא מים וכובע.", isPhishing: false },
  { id: 8, text: "התגלתה בעיה עם החשבון שלך ב-TikTok. לחץ כאן כדי לפתור.", isPhishing: true },
  { id: 9, text: "חבר שלך שלח לך מתנה ב-Brawl Stars! לחץ כאן כדי לקבל אותה.", isPhishing: true },
  { id: 10, text: "המורה הזכירה שבשבוע הבא מבחן במדעים. כדאי להתכונן.", isPhishing: false },
];


const PhishingHunter = () => {
  const [score, setScore] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [finished, setFinished] = useState(false);

  const handleGuess = (isSafe) => {
    const currentMessage = messages[currentMessageIndex];
    if ((isSafe && !currentMessage.isPhishing) || (!isSafe && currentMessage.isPhishing)) {
      setScore(score + 1);
      setFeedback("נכון! כל הכבוד!");
    } else {
      setFeedback("שגוי! שים לב יותר.");
    }

    setTimeout(() => {
      setFeedback("");
      if (currentMessageIndex === messages.length - 1) {
        setFinished(true);
      } else {
        setCurrentMessageIndex(currentMessageIndex + 1);
      }
    }, 2000);
  };

  const restartGame = () => {
    setScore(0);
    setCurrentMessageIndex(0);
    setFinished(false);
  };

  const getFinalMessage = () => {
    const percentage = (score / messages.length) * 100;
    if (percentage > 80) {
      return "כל הכבוד! אתה מלך הפישינג!";
    } else if (percentage >= 50) {
      return "עבודה טובה, אבל יש לך עוד מה ללמוד!";
    } else {
      return "יש לך עוד על מה לעבוד! נסה שוב.";
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>צייד הפישינג</h1>
      <p className={styles.instructions}>קרא את ההודעה והחליט אם היא בטוחה או מסוכנת!</p>

      {!finished ? (
        <>
          {/* סרגל התקדמות */}
          <div className={styles.progressBar}>
            <div
              className={styles.progress}
              style={{ width: `${(currentMessageIndex / messages.length) * 100}%` }}
            ></div>
          </div>

          {/* תיבת ההודעה */}
          <div className={styles.messageBox}>
            <img src="/src/assets/Logo.png" alt="Logo" className={styles.logo} />
            {messages[currentMessageIndex].text}
          </div>

          <div className={styles.buttons}>
            <button onClick={() => handleGuess(false)} className={styles.phishingButton}>
              מסוכן
            </button>
            <button onClick={() => handleGuess(true)} className={styles.safeButton}>
              בטוח
            </button>
          </div>

          {feedback && <p className={styles.feedback}>{feedback}</p>}
          <p className={styles.score}>ניקוד: {score}</p>
        </>
      ) : (
        <div className={styles.messageBox}>
          <img src="/src/assets/Logo.png" alt="Logo" className={styles.logo} />
          <p>{getFinalMessage()}</p>
          <button onClick={restartGame} className={styles.safeButton}>
            שחק שוב
          </button>
        </div>
      )}
    </div>
  );
};

export default PhishingHunter