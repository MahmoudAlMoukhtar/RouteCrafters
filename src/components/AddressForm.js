// AddressForm.js

import React, { useState } from 'react';

const AddressForm = ({ onAddressSubmit }) => {
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLatitudeChange = (e) => {
    setLatitude(e.target.value);
  };

  const handleLongitudeChange = (e) => {
    setLongitude(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate inputs (e.g., non-empty name, valid latitude, valid longitude)
    if (name && !isNaN(latitude) && !isNaN(longitude)) {
      const addressData = {
        name,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      };
      onAddressSubmit(addressData);
    } else {
      // Handle invalid input (show an error message, etc.)
      console.error('Invalid address input');
    }
  };

  return (
    <div className='form_item'>
      <h2>Address Information</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Address name"
          value={name}
          onChange={handleNameChange}
        />
        <div className='sub_row_input'>
          <input
            type="number"
            placeholder="Latitude"
            value={latitude}
            onChange={handleLatitudeChange}
          />
          <input
            type="number"
            placeholder="Longitude"
            value={longitude}
            onChange={handleLongitudeChange}
            />
        </div>
        <button type="submit">Add Address</button>
      </form>
    </div>
  );
};

export default AddressForm;
