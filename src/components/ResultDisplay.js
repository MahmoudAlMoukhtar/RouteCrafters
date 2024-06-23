// ResultDisplay.js

import React from 'react';

const ResultDisplay = ({ goodsLoaded, maxValue, shortestRoute }) => {
  return (
    <React.Fragment>

    <div className='form_item resulte'>
      <h2>Maximum Value</h2>
      <div>
        <strong className='max_value'>{maxValue}</strong>
      </div>      
    </div>
    <div className='form_item resulte'>
      <h2>Shortest Route</h2>

        {(shortestRoute.length > 0 && 
        <ul>
          {shortestRoute.map((address, index) => (
            <li key={index}>{address.name}</li>
          ))}
        </ul>)}
    </div>
    </React.Fragment>
  );
};

export default ResultDisplay;
