import React from 'react';

const Ship = ({ shipType, sizeHor, sizeVer, key, sunk }) => {
  return {
    shipType: shipType,
    sizeHor: sizeHor,
    sizeVer: sizeVer,
    key: key,
    sunk: sunk,
  };
};

export default Ship;
