import React, { useState, useEffect } from 'react';
import Tile from './Tile';
import '../styles/board.css';
import Ship from './Ship';

const Board = ({ player }) => {
  const [tiles, setTiles] = useState([]);
  const [ships, setShips] = useState([
    <Ship
      shipType="Carrier"
      sizeHor={[0, 1, 2, 3, 4]}
      sizeVer={[0, 10, 20, 30, 40]}
      hits={0}
      sunk={false}
      key={`${player} Carrier`}
    />,
    <Ship
      shipType="Battleship"
      sizeHor={[0, 1, 2, 3]}
      sizeVer={[0, 10, 20, 30]}
      hits={0}
      sunk={false}
      key={`${player} Battleship`}
    />,
    <Ship
      shipType="Cruiser"
      sizeHor={[0, 1, 2]}
      sizeVer={[0, 10, 20]}
      hits={0}
      sunk={false}
      key={`${player} Cruiser`}
    />,
    <Ship
      shipType="Submarine"
      sizeHor={[0, 1, 2]}
      sizeVer={[0, 10, 20]}
      hits={0}
      sunk={false}
      key={`${player} Submarine`}
    />,
    <Ship
      shipType="Destroyer"
      sizeHor={[0, 1]}
      sizeVer={[0, 10]}
      hits={0}
      sunk={false}
      key={`${player} Destroyer`}
    />,
  ]); //ships are just objects... also maybe put objects directly into array
  const newTiles = [];

  //+ random int
  const randomNum = (max) => {
    return Math.floor(Math.random() * max);
  };

  //+ create tiles
  const createTiles = () => {
    for (let i = 0; i < 100; i++) {
      newTiles.push({
        key: i + player,
        id: i + player,
        taken: false,
        type: 'tile',
        hit: false,
      });
    }
  };

  //+ Check for other ships
  const checkTaken = (directions, start) => {
    if (
      directions.some((index) => {
        if (newTiles[start + index].taken === true) {
          return true;
        }
      })
    ) {
      return true;
    }
  };

  //+ Check for edge
  const checkEdge = (directions, start) => {
    if (
      directions.some((index) => {
        if (start % 10 !== 0 && (start + index) % 10 === 0) {
          return true;
        }
      })
    ) {
      return true;
    }
  };

  //+ check for edge and other ships
  const checkPosition = (start, directions) => {
    if (
      checkEdge(directions, start) === true ||
      checkTaken(directions, start) === true
    ) {
      return true;
    }
  };

  //+ decide direction
  const chooseDirection = (i) => {
    if (randomNum(2) === 1) {
      return ships[i].props.sizeHor;
    } else {
      return ships[i].props.sizeVer;
    }
  };

  //+ create a ship
  const createShip = (i) => {
    const directions = chooseDirection(i);
    let width = 1;
    if (directions === ships[i].props.sizeVer) {
      width = 10;
    }
    const start = randomNum(newTiles.length - directions.length * width);
    const type = ships[i].props.shipType;
    if (checkPosition(start, directions) !== true) {
      directions.map((position) => {
        newTiles[start + position].taken = true;
        newTiles[start + position].type = type;
      });
    } else {
      createShip(i);
    }
  };

  //+ loop and create all ships
  const createAllShips = () => {
    for (let i = 0; i < 5; i++) {
      createShip(i);
    }
  };

  //+ create tiles and ships on load
  useEffect(() => {
    // create tiles then set array as state
    createTiles();
    createAllShips();
    setTiles(newTiles);
  }, []);

  //# on click function
  const handleClick = (e) => {
    e.preventDefault();
    const { id } = e.target;
    const hitValue = e.target.getAttribute('data-hit');
    if (hitValue === 'false' && id.includes('comp')) {
      const tilePos = Number(id.slice(0, -4));
      setTiles((old) => [...old], {
        [tiles[tilePos]]: (tiles[tilePos].hit = true),
      });
    }
  };

  return (
    <div id={player} className="board">
      {tiles.map((item) => {
        return (
          <Tile
            key={item.key}
            id={item.id}
            taken={item.taken}
            type={item.type}
            hit={item.hit}
            click={handleClick}
          />
        );
      })}
    </div>
  );
};

export default Board;
