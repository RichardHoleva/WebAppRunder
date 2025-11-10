import React from 'react';

function EventGallery({ images = [] }) {
  // Default placeholder images if none provided
  const defaultImages = [
    'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800',
    'https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=800',
  ];

  const galleryImages = images.length > 0 ? images : defaultImages;

  return (
    <div className="gallery-section">
      <div className="gallery-header">
        <h3><i class="fa-regular fa-image fa-lg"></i>Event Gallery</h3>
        <button className="view-all-btn">View All</button>
      </div>
      
      <div className="gallery-grid">
        {/* First image - takes full left column */}
        {galleryImages[0] && (
          <div className="gallery-image gallery-image-large">
            <img src={galleryImages[0]} alt="Event photo 1" />
          </div>
        )}
        
        {/* Second image - top right */}
        {galleryImages[1] && (
          <div className="gallery-image gallery-image-small">
            <img src={galleryImages[1]} alt="Event photo 2" />
          </div>
        )}
        
        {/* Add photo button - bottom right */}
        <button className="add-image-btn">
          <div className="add-icon">+</div>
          <span>Add Photo</span>
        </button>
      </div>
    </div>
  );
}

export default EventGallery;