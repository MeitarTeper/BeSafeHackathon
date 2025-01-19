import React, { useState } from 'react';
import axios from 'axios';
import PreviewGenerator from "./PreviewGenerator";
import PropTypes from "prop-types";

const LessonPlanUpload = ({ onAddLessonPlan }) => {
  const [file, setFile] = useState(null);
  const [lessonName, setLessonName] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [time, setTime] = useState('');
  const [previewPhoto, setPreviewPhoto] = useState(null);
  

  const handleFileChange = async (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  const handlePreviewGenerated = (previewUrl) => {
    setPreviewPhoto(previewUrl); // Store the generated preview
  };

  const handleUpload =  (e) => {
    e.preventDefault();
    if (!file || !lessonName || !ageGroup || !time) {
      return alert('Please fill in all fields and select a file.');
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
  
      onAddLessonPlan(newFile); // Pass data to parent

      // Reset fields
      setFile(null);
      setLessonName("");
      setAgeGroup("");
      setTime("");
      setPreviewPhoto(null);

    // const formData = new FormData();
    // formData.append('file', file);
    // formData.append('lessonName', lessonName);
    // formData.append('ageGroup', ageGroup);
    // formData.append('time', time);

    // try {
    //   const response = await axios.post('/api/upload', formData, {
    //     headers: { 'Content-Type': 'multipart/form-data' },
    //   });
    //   alert('Lesson plan uploaded successfully!');
    //   setFilesList((prev) => [...prev, response.data]); // Add new file to list
    //   // Reset fields
    //   setFile(null);
    //   setLessonName('');
    //   setAgeGroup('');
    //   setTime('');
    // } catch (err) {
    //   console.error(err);
    //   alert('Error uploading lesson plan.');
    // }

    
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <div>
          <label>שם מערך שיעור:</label>
          <input
            type="text"
            value={lessonName}
            onChange={(e) => setLessonName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>קבוצת גילאים מתאימה:</label>
          <input
            type="text"
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value)}
            required
          />
        </div>
        <div>
          <label>זמן הפעילות:</label>
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label>קובץ:</label>
          <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
        </div>
        {/* Use PreviewGenerator to create a preview */}
      {file && (
        <PreviewGenerator file={file} onPreviewGenerated={handlePreviewGenerated} />
      )}
        <button type="submit" className="bg-[#1A659E] text-white px-8 py-3 rounded-full hover:bg-[#004E89] transition-colors inline-flex items-center gap-2">
            העלה</button>
        
      </form>
    </div>
  );
};

LessonPlanUpload.propTypes = {
    onAddLessonPlan: PropTypes.func.isRequired,
  };

export default LessonPlanUpload;
