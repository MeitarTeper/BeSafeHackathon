import React, { useState } from "react";
import './chatbot.css'; // שימוש בעיצוב חיצוני בלבד

const SafeBot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "שלום! אני SafeBot, כאן כדי לעזור לך להתמודד עם בעיות ברשת." },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return; // בדיקה אם ההודעה ריקה
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }), // שולחים הודעה מהצ'אט
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.response }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "מצטער, משהו השתבש. נסה שוב מאוחר יותר." },
      ]);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="message"
            style={{
              alignSelf: msg.sender === "bot" ? "flex-start" : "flex-end",
              backgroundColor: msg.sender === "bot" ? "#f0f0f0" : "#d1e7dd",
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          className="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="הקלד הודעה..."
        />
        <button className="button" onClick={handleSend}>
          שלח
        </button>
      </div>
    </div>
  );
};

export default SafeBot;
