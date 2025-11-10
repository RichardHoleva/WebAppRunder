import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import "../styles/generalinfo.css";
import AddImage from "../components/CreateEventComponents/AddImage.jsx";
import InputField from "../components/CreateEventComponents/InputField.jsx";
import Entrance from "../components/CreateEventComponents/Entrance.jsx";
import { createEvent } from "../lib/events.js";

// page for creating a new running event
export default function CreateGeneral() {
  const navigate = useNavigate();

  // all the form data we need to collect
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [typeOfRun, setTypeOfRun] = useState("free");
  const [ticketPrice, setTicketPrice] = useState("");
  const [isCreating, setIsCreating] = useState(false); // prevents multiple clicks

  // go back to dashboard without saving
  const handleClose = () => navigate("/dashboard");

  // save the event and go back to dashboard
  const handleConfirm = async () => {
    // check if required fields are filled
    if (!title.trim() || !location.trim() || !date) {
      alert("Please fill in all required fields");
      return;
    }

    setIsCreating(true);

    // prepare all event data
    const eventData = {
      title: title.trim(),
      description: description.trim(),
      location: location.trim(),
      date,
      time,
      typeOfRun,
      ticketPrice: typeOfRun === 'paid' ? parseFloat(ticketPrice) || 0 : null
    };

    try {
      // try to create the event
      const result = await createEvent(eventData, imageFile);
      
      if (result.success) {
        alert("Event created successfully!");
        navigate("/dashboard");
      } else {
        alert(`Error creating event: ${result.error}`);
      }
    } catch (error) {
      alert(`Error creating event: ${error.message}`);
    } finally {
      setIsCreating(false);
    }
  };

  // when user selects an image
  const handleImageChange = (file) => {
    setImageFile(file);
  };

  // when user changes ticket price
  const handlePriceChange = (price) => {
    setTicketPrice(price);
  };

  return (
    <div className="create-general-page">
      <NavBar />
      <ProgressBar />

      <div className="create-general-container">
        <div className="header">
          <h2>General Information</h2>
          <button className="close-btn" onClick={handleClose}>×</button>
        </div>

        <div className="content-wrapper">
          <div className="form-section">
            {/* image upload section */}
            <AddImage onImageSelect={handleImageChange} />

            {/* event title - required */}
            <div className="section-header">
              <h3 className="section-title">Event Title</h3>
              <span className="required-badge">Required</span>
            </div>
            <InputField
              placeholder="Enter event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* event description - optional */}
            <div className="section-header-description">
              <h3 className="section-title">Event Description</h3>
              <span className="required-badge">Optional</span>
            </div>
            <InputField
              placeholder="Enter event description"
              multiline={true}
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {/* free or paid event */}
            <div className="section-header-description">
              <h3 className="section-title">Type of Run</h3>
            </div>
            <Entrance 
              setTypeOfRun={setTypeOfRun} 
              onPriceChange={handlePriceChange}
            />

            {/* location - required */}
            <div className="section-header">
              <h3 className="section-title">Location</h3>
              <span className="required-badge">Required</span>
            </div>
            <InputField
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            {/* date and time section */}
            <div className="date-time-container">
              <div className="date-time-field">
                <div className="section-header">
                  <h3 className="section-title">Select Date</h3>
                  <span className="required-badge">Required</span>
                </div>
                <InputField
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="date-time-field">
                <div className="section-header">
                  <h3 className="section-title">Select Time</h3>
                </div>
                <InputField
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>

            {/* submit button */}
            <button 
              className="confirm-btn" 
              onClick={handleConfirm}
              disabled={isCreating}
            >
              {isCreating ? "Creating Event..." : "Confirm Event"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}