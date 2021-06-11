import React, { useState, useEffect } from 'react';
import Tile from './Tile';
import '../styles/board.css';
import Ship from './Ship';

const Board = ({ player }) => {
  const [tiles, setTiles] = useState([]);
  const [ships, setShips] = useState([]);
  const newTiles = [];
  const newShips = [];
  const available = [];

  const testShips = newShips.some((position) => {
    if (position === newShips[0].props.position) {
      return true;
    } else {
      return false;
    }
  });

  //random int
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  // create available tiles
  const createAvailable = () => {
    for (let i = 0; i < 100; i++) {
      available.push(i);
    }
  };

  //check if int matches
  const checkSome = () => {
    available.some((num) => {});
  };

  const createPosition = (size) => {
    let arr = [];
    const start = available[getRandomInt(available.length)];
    let startString = start.toString();
    const testStart = () => {
      if (startString.length !== 1) {
        startString = Number(startString.substring(1));
        if (startString + size > 9) {
          return false;
        } else {
          return true;
        }
      } else if (Number(startString) + size > 9) {
        return false;
      } else {
        return true;
      }
    };

    if (testStart()) {
      for (let i = start; i < start + size; i++) {
        arr.push(i);
      }
    } else {
      for (let i = start - size; i < start - size + size; i++) {
        arr.push(i);
      }
    }
    available.splice(start - 1, size);
    return arr;
  };

  const createTiles = () => {
    for (let i = 0; i < 100; i++) {
      newTiles.push(
        <Tile key={i + player} id={i + player} newShips={newShips} />
      );
    }
  };

  const createShips = () => {
    newShips.push(
      <Ship
        shipType="Carrier"
        size={5}
        hits={0}
        sunk={false}
        position={createPosition(5)} // get random tile from array instead
      />,
      <Ship
        shipType="Battleship"
        size={4}
        hits={0}
        sunk={false}
        position={createPosition(4)} // get random tile from array instead
      />,
      <Ship
        shipType="Cruiser"
        size={3}
        hits={0}
        sunk={false}
        position={createPosition(3)} // get random tile from array instead
      />,
      <Ship
        shipType="Submarine"
        size={3}
        hits={0}
        sunk={false}
        position={createPosition(3)} // get random tile from array instead
      />,
      <Ship
        shipType="Destroyer"
        size={2}
        hits={0}
        sunk={false}
        position={createPosition(2)} // get random tile from array instead
      />
    );
  };

  useEffect(() => {
    //@ create tiles then set array as state
    createAvailable();
    createShips();
    createTiles();
    setTiles(newTiles);
    setShips(newShips);
    console.log(newShips);
    console.log(player);
    console.log(available);
  }, []);

  return (
    <div id={player} className="board">
      {tiles}
    </div>
  );
};

export default Board;
