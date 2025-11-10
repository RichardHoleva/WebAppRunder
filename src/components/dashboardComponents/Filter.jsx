import React, { useState, useEffect } from 'react';
import '../../styles/dashboard.css';

function Filter({ onFilterChange }) {
  const [selected, setSelected] = useState('created');

  // Set initial filter on component mount
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange('created');
    }
  }, [onFilterChange]);

  const handleFilterChange = (filterType) => {
    setSelected(filterType);
    if (onFilterChange) {
      onFilterChange(filterType);
    }
  };

  return (
    <div className="filter-container">
      <button 
        className={selected === 'created' ? 'filter-btn active' : 'filter-btn'}
        onClick={() => handleFilterChange('created')}
      >
        Created Runs
      </button>
      <button 
        className={selected === 'joined' ? 'filter-btn active' : 'filter-btn'}
        onClick={() => handleFilterChange('joined')}
      >
        Joined Runs
      </button>
    </div>
  );
}

export default Filter;