import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/preview.css';

function EventHeader({ event }) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="event-header">
      <div className="header-actions">
        <button className="back-btn" onClick={handleBackClick}>←</button>
        <button className="share-btn"><i class="fa-solid fa-share-nodes"></i></button>
      </div>
      <img src={event.image} alt={event.title} className="preview-event-image" />
      <div className="event-info">
        <h1>{event.title}</h1>
        <div className="event-meta">
          <span className="date"><i class="fa-regular fa-calendar"></i> {event.date}</span>
          <span className="location"><i class="fa-solid fa-location-dot"></i><b>Meet Point</b> - {event.location}</span>
        </div>
        <div className="event-stats">
          <span className="difficulty"><i class="fa-solid fa-chart-simple"></i>{event.difficulty}</span>
          <span className="participants"><i class="fa-solid fa-user-group"></i>{event.participants} Participants</span>
          <span className="privacy"><i class="fa-solid fa-lock"></i>{event.privacy}</span>
        </div>
      </div>
    </div>
  );
}

export default EventHeader;