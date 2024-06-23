// TruckForm.js

import React, { useState } from 'react';

const TruckForm = ({ onCapacitySubmit }) => {
  const [capacity, setCapacity] = useState('');

  const handleCapacityChange = (e) => {
    setCapacity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate capacity (e.g., ensure it's a positive integer)
    if (capacity && !isNaN(capacity) && parseInt(capacity) > 0) {
      onCapacitySubmit(parseInt(capacity));
    } else {
      // Handle invalid input (show an error message, etc.)
      console.error('Invalid capacity input');
    }
  };

  return (
    <div className='form_item'>
      <h2>Truck Capacity</h2>
      <form onSubmit={handleSubmit}>
        <input
          className='capacity_input'
          type="number"
          placeholder="Enter truck capacity"
          value={capacity}
          onChange={handleCapacityChange}
        />
        <button type="submit" className='capacity_button'>Generate Optimal Solution</button>
      </form>
    </div>
  );
};

export default TruckForm;
