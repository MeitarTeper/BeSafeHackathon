import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './LessonPlanUpload.css'; // קובץ CSS מותאם אישית
import { addLesson } from '../../services/lessons_api';
import PreviewGenerator from './PreviewGenerator';

const LessonPlanUpload = ({ onAddLessonPlan }) => {
  const [file, setFile] = useState(null);
  const [lessonName, setLessonName] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [time, setTime] = useState('');
  const [previewPhoto, setPreviewPhoto] = useState(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  const handlePreviewGenerated = (previewUrl) => {
    setPreviewPhoto(previewUrl);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !lessonName || !ageGroup || !time) {
      console.log('Please fill in all fields and select a file.');
      return;
    }

    const newFile = {
      id: Date.now(),
      fileName: file.name,
      lessonName,
      ageGroup,
      time,
      url: URL.createObjectURL(file),
      previewPhoto,
    };

    try {
      const response = await addLesson(newFile);
      if (response.status === 200) {
        onAddLessonPlan(newFile);
        // Reset fields
        setFile(null);
        setLessonName('');
        setAgeGroup('');
        setTime('');
        setPreviewPhoto(null);
      } else {
        console.log('Error adding lesson. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading lesson:', error);
    }
  };

  return (
    <div className="lesson-upload-container">
      <form onSubmit={handleUpload} className="lesson-upload-form">
        <div className="form-group">
          <label className="form-label">שם מערך שיעור:</label>
          <input
            type="text"
            value={lessonName}
            onChange={(e) => setLessonName(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">קבוצת גילאים מתאימה:</label>
          <input
            type="text"
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">זמן הפעילות:</label>
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">
            קובץ:
            <span className="file-note"> (קובץ PDF בלבד)</span>
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf"
            className="file-input"
          />
        </div>
        {file && (
          <PreviewGenerator file={file} onPreviewGenerated={handlePreviewGenerated} />
        )}
        <button type="submit" className="upload-button">
          העלה
        </button>
      </form>
    </div>
  );
};

LessonPlanUpload.propTypes = {
  onAddLessonPlan: PropTypes.func.isRequired,
};

export default LessonPlanUpload;
