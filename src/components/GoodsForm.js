// GoodsForm.js

import React, { useState } from 'react';

const GoodsForm = ({ onGoodsSubmit }) => {
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [value, setValue] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate inputs (e.g., non-empty name, positive weight, positive value)
    if (name && !isNaN(weight) && !isNaN(value)) {
      const goodsData = {
        name,
        weight: parseFloat(weight),
        value: parseFloat(value),
      };
      onGoodsSubmit(goodsData);
    } else {
      // Handle invalid input (show an error message, etc.)
      console.error('Invalid goods input');
    }
  };

  return (
    <div className='form_item'>
      <h2>Goods Information</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Goods name"
          value={name}
          onChange={handleNameChange}
        />
        <div className='sub_row_input'>
          <input
            type="number"
            placeholder="Goods weight"
            value={weight}
            onChange={handleWeightChange}
          />
          <input
            type="number"
            placeholder="Goods value"
            value={value}
            onChange={handleValueChange}
            />
        </div>
        <button type="submit">Add Goods</button>
      </form>
    </div>
  );
};

export default GoodsForm;
