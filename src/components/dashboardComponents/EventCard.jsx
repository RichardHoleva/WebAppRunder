import React from 'react';
import runnerImage from '../../assets/runner.png';
import '../../styles/dashboard.css';
import { useNavigate } from 'react-router-dom';

// shows event info in a card format
export default function EventCard({ id, title, location, date, imageUrl, onJoinEvent, description, onDeleteEvent, showDeleteButton = false }) {
  const navigate = useNavigate();

  // Parse date if it's a string
  const parseDate = (dateInput) => {
    if (typeof dateInput === 'string') {
      const dateObj = new Date(dateInput);
      return {
        month: dateObj.toLocaleDateString('en-US', { month: 'short' }),
        day: dateObj.getDate().toString().padStart(2, '0')
      };
    }
    return dateInput; // assume it's already in the correct format
  };

  const parsedDate = parseDate(date);

  return (
    <div className="event-card">
      <div className="event-image-container">
        <img
          src={imageUrl || runnerImage} // use event image or default runner image
          alt={title}
          className="event-image"
        />

        {showDeleteButton && (
          <button className="delete-button" onClick={() => onDeleteEvent(id)}>
            ×
          </button>
        )}

        <div className="event-date">
          <span className="event-month">{parsedDate.month}</span>
          <span className="event-day">{parsedDate.day}</span>
        </div>
        
        <button className="join-button" onClick={() => navigate(`/event/${id}`)}>
          Join Event
        </button>
      </div>
        
      {/* basic event info */}
      <div className="event-info">
        <h3>{title}</h3>
        <p>{location}</p>
      </div>
    </div>
  );
}