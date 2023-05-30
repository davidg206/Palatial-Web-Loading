import React from 'react';

/**
 * ProgressBar Component
 * 
 * This is a functional component that renders a progress bar.
 * 
 * @param {Number} progress - A value between 0 and 100 representing the current progress.
 * @return {JSX} - Returns the progress bar component.
 */


function ProgressBar({ progress }) {
    return (
      <div className="progressBar">
        <div className="progressBarProgress" style={{ width: `${progress}%` }} />
      </div>
    );
  }
  export default ProgressBar;