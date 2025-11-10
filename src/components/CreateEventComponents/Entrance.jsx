import React, { useState, useEffect } from 'react';
import '../../styles/generalinfo.css';

const Entrance = ({ setTypeOfRun, onPriceChange }) => {
  const [entranceType, setEntranceType] = useState('free');
  const [ticketPrice, setTicketPrice] = useState('');

  const handleEntranceTypeChange = (type) => {
    setEntranceType(type);
    if (setTypeOfRun) {
      setTypeOfRun(type);
    }
    
    if (type === 'free') {
      setTicketPrice('');
      if (onPriceChange) {
        onPriceChange('');
      }
    }
  };

  const handlePriceChange = (price) => {
    setTicketPrice(price);
    if (onPriceChange) {
      onPriceChange(price);
    }
  };

  useEffect(() => {
    // Initialize with free
    if (setTypeOfRun) {
      setTypeOfRun('free');
    }
  }, [setTypeOfRun]);

  return (
    <div className="entrance-container">
      <div className="button-group">
        <button
          className={`entrance-btn ${entranceType === 'paid' ? 'active' : ''}`}
          onClick={() => handleEntranceTypeChange('paid')}
        >
          Paid Entrance
        </button>
        <button
          className={`entrance-btn ${entranceType === 'free' ? 'active' : ''}`}
          onClick={() => handleEntranceTypeChange('free')}
        >
          Free Entrance
        </button>
      </div>
      
      {entranceType === 'paid' && (
        <div className="price-input-container">
          <label htmlFor="ticketPrice">Ticket Price:</label>
          <input
            type="number"
            id="ticketPrice"
            value={ticketPrice}
            onChange={(e) => handlePriceChange(e.target.value)}
            placeholder="Enter price in DKK"
            min="0"
            step="0.01"
          />
        </div>
      )}
    </div>
  );
};

export default Entrance;