import React, { useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import "./Completion.css"; // ייבוא הסטייל
import CertificateBackground from "../../assets/images/done.png"; // ייבוא התמונה

const Completion = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const generatePDF = () => {
    const input = document.getElementById("certificate");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, 297, 210); // התאמה לגודל A4
      pdf.save("certificate.pdf");
    });
  };

  return (
    <div className="completion-page">
      <div className="completion-content">
        <h1>🎉 סיום בהצלחה! 🎉</h1>
        <p>מלאו את שמכם על מנת לקבל את התעודה:</p>
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

        {/* תעודה */}
        <div id="certificate" className="certificate">
          {/* רקע התעודה */}
          <img
            src={CertificateBackground} // שימוש בתמונה כרקע
            alt="תעודת הסמכה"
            className="certificate-background"
          />
          {/* שם דינאמי */}
          <div className="certificate-name">{name || "________"}</div>
        </div>
      </div>
    </div>
  );
};

export default Completion;
