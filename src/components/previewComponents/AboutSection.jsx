import React from 'react';
import '../../styles/preview.css';

function AboutSection({ description }) {
  return (
    <div className="about-section">
      <h2><i class="fa-solid fa-circle-info"></i>About</h2>
      <p>{description}</p>
    </div>
  );
}

export default AboutSection;