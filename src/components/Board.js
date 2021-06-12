import React, { useState, useEffect } from 'react';
import Tile from './Tile';
import '../styles/board.css';
import Ship from './Ship';

const Board = ({ player }) => {
  const [tiles, setTiles] = useState([]);
  const [ships, setShips] = useState([
    <Ship
      shipType="Carrier"
      size={[0, 1, 2, 3, 4]}
      hits={0}
      sunk={false}
      key={`${player} Carrier`}
    />,
    <Ship
      shipType="Battleship"
      size={[0, 1, 2, 3]}
      hits={0}
      sunk={false}
      key={`${player} Battleship`}
    />,
    <Ship
      shipType="Cruiser"
      size={[0, 1, 2]}
      hits={0}
      sunk={false}
      key={`${player} Cruiser`}
    />,
    <Ship
      shipType="Submarine"
      size={[0, 1, 2]}
      hits={0}
      sunk={false}
      key={`${player} Submarine`}
    />,
    <Ship
      shipType="Destroyer"
      size={[0, 1]}
      hits={0}
      sunk={false}
      key={`${player} Destroyer`}
    />,
  ]); //ships are just objects... also maybe put objects directly into array
  const newTiles = [];

  //random int
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
      });
    }
  };

  useEffect(() => {
    //@ create tiles then set array as state
    console.log(player);

    createTiles();
    setTiles(newTiles);

    console.log(ships);
  }, []);

  const checkTiles = (arr, start) => {
    arr.props.size.some((index) => {
      // some returns FIRST item it finds
      if (
        document
          .getElementById(`${start + index}${player}`)
          .getAttribute('data-taken') === 'true'
      ) {
        console.log('found: ' + (index + start));
        console.log('index: ' + index);
        console.log(document.getElementById(`${start + index}${player}`));
        console.log(true);
        return true;
      }
    });
  };

  const createPosition = () => {
    const start = randomNum(tiles.length - ships[4].props.size.length);
    console.log('start: ' + start);
    checkTiles(ships[4], start);
  };

  const markTaken = () => {
    console.log(tiles[20].taken);
    setTiles((old) => [...old], {
      [tiles[20]]: (tiles[20].taken = true),
    });
  };
  // map tiles from array of objects instead
  return (
    <div onClick={createPosition} id={player} className="board">
      {tiles.map((item) => {
        return <Tile key={item.key} id={item.id} taken={item.taken} />;
      })}
    </div>
  );
};

export default Board;
