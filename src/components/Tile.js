import React, { useState, useEffect } from 'react';
import '../styles/tile.css';

const Tile = ({ id, taken }) => {
  //pass down state and arrays
  //add taken attribute
  const check = taken === true;

  return (
    <div
      id={id}
      data-taken={check ? true : false}
      className={check ? 'selected' : 'tile'}
    ></div>
  );
};

export default Tile;
