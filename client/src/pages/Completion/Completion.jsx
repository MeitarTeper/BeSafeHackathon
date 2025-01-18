import React, { useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import "./Completion.css";
import DoneImage from "../../assets/Done.png"; // ייבוא התמונה


const Completion = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate(); // שימוש ב-useNavigate לניווט

  const generatePDF = () => {
    const input = document.getElementById("certificate");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save("certificate.pdf");
    });
  };

  return (
    <div className="completion-page">
      <div className="completion-content">
        <h1>🎉 !סיום בהצלחה 🎉</h1>
        <p>:מלאו את שמכם על מנת לקבל את התעודה</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="הכנס שם מלא"
          className="name-input"
        />
        <div className="buttons-container">
          <button onClick={generatePDF} className="download-btn">
            הורד תעודה
          </button>
          <button onClick={() => navigate("/")} className="home-btn">
            חזרה לדף הבית
          </button>
        </div>

        <div id="certificate" className="certificate">
          <div className="certificate-header">
            <h2>תעודת הסמכה</h2>
            <p>-מוענקת בזאת ל</p>
          </div>
          <div className="certificate-name">
            <h1>{name || "________"}</h1>
          </div>
          <div className="certificate-body">
            <p>על סיום בהצלחה של כל שלבי ההסמכה בנושא <strong>בטיחות ברשת</strong>.</p>
            <p>!אנו גאים בך על הישג זה ומאחלים לך המון הצלחה</p>
          </div>
          <div className="certificate-footer">
            <p>SafeNet - ההגנה שלך ברשת</p>
            <p>© 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Completion;
