import React from 'react';
import PropTypes from 'prop-types';

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

ProgressBar.propTypes = {
  currentStage: PropTypes.number.isRequired,
  totalStages: PropTypes.number.isRequired,
};

export default ProgressBar;

