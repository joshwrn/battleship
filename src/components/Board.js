import React, { useState, useEffect } from 'react';
import Tile from './Tile';
import '../styles/board.css';
import uniqid from 'uniqid';

const Board = () => {
  const [tiles, setTiles] = useState([]);
  const newTiles = [];

  const createTiles = () => {
    for (let i = 0; i < 100; i++) {
      newTiles.push(<Tile key={i} />);
    }
    console.log(newTiles);
  };

  useEffect(() => {
    //create tiles then set array as state
    createTiles();
    setTiles(newTiles);
  }, []);

  return (
    <div onClick={null} className="board">
      {tiles}
    </div>
  );
};

export default Board;
