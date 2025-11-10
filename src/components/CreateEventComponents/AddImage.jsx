import React, { useState } from "react";
import "../../styles/generalinfo.css";

export default function AddImage({ onImageSelect }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Call parent callback with the actual file
      if (onImageSelect) {
        onImageSelect(file);
      }
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    if (onImageSelect) {
      onImageSelect(null);
    }
  };

  return (
    <div className="add-image-container">
      <input
        type="file"
        id="image-upload"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
      
      {!previewUrl ? (
        <label htmlFor="image-upload" className="upload-box">
          <div className="upload-content">
            <p>Add Image</p>
          </div>
        </label>
      ) : (
        <div className="image-preview">
          <img src={previewUrl} alt="Preview" />
          <button className="remove-btn" onClick={handleRemoveImage}>×</button>
        </div>
      )}
    </div>
  );
}