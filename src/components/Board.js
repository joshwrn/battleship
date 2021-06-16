import React, { useState, useEffect } from 'react';
import Tile from './Tile';
import '../styles/board.css';
import makeCompMove from './functions/botLogic';
import shipList from './functions/shipList';
import { createAllShips } from './functions/createAllShips.js';

const Board = ({
  player,
  gameStatus,
  setGameStatus,
  turn,
  setTurn,
  restart,
  setRestart,
  resetGame,
}) => {
  const [tiles, setTiles] = useState([]);
  const [lastHit, setLastHit] = useState(-100);
  const [firstHit, setFirstHit] = useState('');
  const [rotate, setRotate] = useState([0, 3]);
  const [sunk, setSunk] = useState([]);
  const [ships, setShips] = useState(shipList(player));
  let newTiles = [];

  //+ create tiles
  const createTiles = () => {
    for (let i = 0; i < 100; i++) {
      newTiles.push({
        key: i + player,
        id: i + player,
        taken: false,
        type: 'tile',
        hit: false,
        number: i,
      });
    }
  };

  //+ create tiles and ships on load
  useEffect(() => {
    // create tiles then set array as state
    createTiles();
    createAllShips(newTiles, ships);
    setTiles(newTiles);
  }, []);

  //+ update ship stats
  const updateHits = (type) => {
    if (type !== 'tile') {
      const findShip = ships.findIndex((ship) => ship.shipType === type);
      setShips((old) => [...old], {
        [ships[findShip]]: (ships[findShip].hits = ships[findShip].hits + 1),
      });
      if (ships[findShip].hits === ships[findShip].sizeHor.length) {
        setShips((old) => [...old], {
          [ships[findShip]]: (ships[findShip].sunk = true),
        });
      }
    }
  };

  //# on click function
  const handleClick = (e) => {
    e.preventDefault();
    const { id } = e.target;
    const hitValue = e.target.getAttribute('data-hit');
    const tileType = e.target.getAttribute('data-type');
    if (
      gameStatus === 'playing' &&
      hitValue === 'false' &&
      id.includes('comp')
    ) {
      const tilePos = Number(id.slice(0, -4));
      setTiles((old) => [...old], {
        [tiles[tilePos]]: (tiles[tilePos].hit = true),
      });
      updateHits(tileType);
      setTurn((prev) => prev + 1);
    }
  };

  //+ reset last hit and rotation on ship sunk
  useEffect(() => {
    setLastHit(-100);
    setRotate([0, 3]);
  }, [sunk]);

  //+ on turn or restart update move
  useEffect(() => {
    //!
    makeCompMove({
      tiles,
      setTiles,
      updateHits,
      player,
      turn,
      rotate,
      setRotate,
      lastHit,
      setLastHit,
      firstHit,
      setFirstHit,
      setRestart,
    });
  }, [turn, restart]);

  //+ set sunk list function and game over
  const addToSunk = () => {
    const filtered = ships.filter((ship) => ship.hits === ship.sizeHor.length);
    let winner;
    if (player === 'comp') {
      winner = 'Player';
    } else {
      winner = 'Computer';
    }
    if (filtered.length === 5) {
      setGameStatus(`Game Over ${winner} Wins`);
    }
    if (filtered.length > sunk.length) {
      setSunk(filtered);
    }
  };

  //+ add to sunk on ship update
  useEffect(() => {
    addToSunk();
  }, [ships]);

  //+ reset the game
  useEffect(() => {
    newTiles = [];
    createTiles();
    setLastHit(-100);
    setFirstHit('');
    setRotate([0, 3]);
    setSunk([]);
    setRestart('');
    setTurn(0);
    setGameStatus('playing');
    setShips(shipList(player));
    createAllShips(newTiles, ships);
    setTiles(newTiles);
  }, [resetGame]);

  return (
    <div>
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
      <div className="sunk-list">
        <p className="sunk-text">Sunk:</p>
        {ships.map((item) => {
          if (item.sunk) {
            return (
              <p className="sunk-text" key={`${item.shipType} ${player}`}>
                {item.shipType + ','}
              </p>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Board;
