import React from 'react';

const Ship = ({ shipType, size, key, sunk }) => {
  return { shipType: shipType, size: size, key: key, sunk: sunk };
};

export default Ship;
