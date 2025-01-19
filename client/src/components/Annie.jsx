import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import './Annie.css';
import annieImage from "../assets/Annie.png";


const Annie = forwardRef((props, ref) => {
    const [showAnnie, setShowAnnie] = useState(false);
    const [annieComment, setAnnieComment] = useState("");
  
    // Expose `show` and `hide` methods to parent component via `ref`
    useImperativeHandle(ref, () => ({
      show: (comment) => {
        setAnnieComment(comment);
        setShowAnnie(true);
      },
      hide: () => {
        setShowAnnie(false);
        setAnnieComment('');
      },
    }));

     // Log when annieComment changes
  // useEffect(() => {
  //   console.log('annieComment updated:', annieComment);
  // }, [annieComment]);
  
    return (
      showAnnie && (
        <div className="annieContainer">
          <img src={annieImage} alt="Annie" className="annieImage" />
          <div className="speechBubble">{annieComment}</div>
        </div>
      )
    );
  });
  
  Annie.displayName = "Annie";
  export default Annie;