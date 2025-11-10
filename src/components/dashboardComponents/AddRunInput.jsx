import React from "react";
import { useNavigate } from 'react-router-dom';
import '../../styles/dashboard.css';

// button to create a new running event
export default function AddRunInput() {
  const navigate = useNavigate(); // this helps us go to different pages

  // when button is clicked, go to the create event page
  const handleCreateEvent = () => {
    navigate('/create-general');
  };

  return (
    <div className="add-run-container">
      <button className="add-run-button group" onClick={handleCreateEvent}>
        <span className="add-run-text"> <span className="add-run-plus">+</span> Create new event</span>
      </button>
    </div>
  );
}