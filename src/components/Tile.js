import React, { useState, useEffect } from 'react';
import '../styles/tile.css';

const Tile = ({ id, newShips }) => {
  const [filteredTiles, setFilteredTiles] = useState([]);
  let tempTiles = [];
  const loopShips = () => {
    for (let i = 0; i < newShips.length; i++) {
      let newArr = newShips[i].props.position.filter((num) => {
        const tilePosition = id.slice(0, -4);
        if (Number(tilePosition) === num) {
          tempTiles.push(num);
          return true;
        } else {
          return false;
        }
      });
    }
  };

  const testShips = filteredTiles.some((num) => {
    const tilePosition = id.slice(0, -4);
    if (Number(tilePosition) === num) {
      return true;
    } else {
      return false;
    }
  });

  useEffect(() => {
    loopShips();
    setFilteredTiles(tempTiles);
  }, []);

  return <div id={id} className={testShips ? 'selected' : 'tile'}></div>;
};

export default Tile;
