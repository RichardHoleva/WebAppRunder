import React from 'react';

// shows the distance info and map button for an event
function DistanceSection({ distance }) {
  return (
    <div className="distance-section">
      <h3>
        <i className="fa-solid fa-route"></i> Distance - {distance}
      </h3>
      <p>See the route where we will be running</p>
      {/* this button will probably open a map later */}
      <button className="open-map-btn">Open Map</button>
    </div>
  );
}

export default DistanceSection;