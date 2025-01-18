import React from 'react';
// Optional if you want to have specific styling

const ProgressBar = ({ currentStage, totalStages }) => {
  const progressWidth = (currentStage / totalStages) * 100;

  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${progressWidth}%` }}
        ></div>
      </div>
      <p className="progress-text">
        שלב {currentStage} מתוך {totalStages}
      </p>
    </div>
  );
};

export default ProgressBar;