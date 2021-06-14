import React, { useState, useEffect } from 'react';
import '../styles/tile.css';

const Tile = ({ id, taken, type, click, hit, number }) => {
  //pass down state and arrays
  //add taken attribute
  const check = taken === true;
  const setTileClass = () => {
    if (hit === true && type !== 'tile') {
      return 'hit';
    } else if (hit === true && type === 'tile') {
      return 'miss';
    } else if (id.includes('comp')) {
      return 'tile';
    } else if (hit === false && type !== 'tile') {
      return 'ship';
    } else {
      return 'tile';
    }
  };

  return (
    <div
      id={id}
      data-taken={check ? true : false}
      data-hit={hit}
      data-type={type}
      className={setTileClass()}
      onClick={click}
    ></div>
  );
};

export default Tile;
