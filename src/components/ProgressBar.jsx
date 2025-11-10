import React from 'react';
import '../styles/progressbar.css';

function ProgressBar({ total = 5, active = 0 }) {
  return (
    <div className="progress-bar-container">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={index === active ? 'bar active' : 'bar'}
        ></div>
      ))}
    </div>
  );
}

export default ProgressBar;