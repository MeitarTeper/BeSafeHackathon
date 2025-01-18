//import { useState, useEffect } from "react";
import { useState } from "react";
import "./ChecklistPage.css";
import ChecklistData from "./ChecklistData";
import UpMenu from "../../components/UpMenu";

const ChecklistPage = () => {
  const [checklist, setChecklist] = useState(ChecklistData);

//  const [userId, setUserId] = useState(null);

//   useEffect(() => {
//     // Check if the user already has a token in local storage
//     let storedUserId = localStorage.getItem("userId");

//     // If no token exists, generate a new one
//     if (!storedUserId) {
//       storedUserId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
//       localStorage.setItem("userId", storedUserId);
//     }

//     // Save the token in state
//     setUserId(storedUserId);
//   }, []);

//   useEffect(() => {
//     const savedChecklist = JSON.parse(localStorage.getItem("checklist"));
//     if (savedChecklist) setChecklist(savedChecklist);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("checklist", JSON.stringify(checklist));
//   }, [checklist]);

  const toggleExpand = (id) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, expanded: !item.expanded } : item
      )
    );
  };

  const markAsCompleted = (id) => {
    setChecklist((prev) =>
        prev.map((item) =>
            item.id === id ? { ...item, completed: !item.completed } : item
        )   
    );
    toggleExpand(id);
  };

  
  const calculateCompletionPercentage = () => {
    const completedItems = checklist.filter((item) => item.completed).length;
    return Math.round((completedItems / checklist.length) * 100);
  };

  const completionPercentage = calculateCompletionPercentage();

  return (
    <div>
      <div className="up-menu">
        <UpMenu />
      </div>
      <div className="checklist-container">
        <h1 className="title">Online Harassment Checklist</h1>
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <p className="completion-text">{completionPercentage}% Complete</p>
        <ul className="checklist">
          {checklist.map((item) => (
            console.log(item),
            <li
              key={item.id}
              className={`checklist-item ${
                item.completed ? "completed" : ""
              }`}
            >
              <div className="checklist-header" onClick={() => toggleExpand(item.id)}>
                <h2 className="checklist-title">{item.title}</h2>
              </div>
              {item.expanded && (
                <div className="checklist-info">
                  {item.info.map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                  <button
                    onClick={() => markAsCompleted(item.id)}
                    className="finish-button"
                  >
                    {item.completed ? "Mark as Unfinished" : "Mark as Finished"}
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChecklistPage;
