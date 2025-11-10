import React from 'react';
import '../../styles/preview.css';

function OrganizerCard({ organizer }) {
  return (
    <div className="organizer-card">
      <img src={organizer.avatar} alt={organizer.name} className="organizer-avatar" />
      <div className="organizer-info">
        <span className="organizer-label">Organizator</span>
        <span className="organizer-name">{organizer.name}</span>
      </div>
      <button className="message-btn"><i class="fa-solid fa-message"></i></button>
    </div>
  );
}

export default OrganizerCard;