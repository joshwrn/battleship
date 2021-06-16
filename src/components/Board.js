import React, { useState, useEffect } from 'react';
import Tile from './Tile';
import '../styles/board.css';
import randomNum from './functions/randomNum';
import randomNumRange from './functions/randomNumRange';
import checkPrediction from './functions/checkPrediction';
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
}) => {
  const [tiles, setTiles] = useState([]);
  const [lastHit, setLastHit] = useState(-100);
  const [firstHit, setFirstHit] = useState('');
  const [rotate, setRotate] = useState([0, 3]);
  const [sunk, setSunk] = useState([]);
  const [ships, setShips] = useState(shipList(player));
  const newTiles = [];

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

  //+ make random move
  const randomMove = (...args) => {
    console.log('random move');
    const random = randomNum(99);
    if (tiles[random].hit === false) {
      setTiles((old) => [...old], {
        [tiles[random]]: (tiles[random].hit = true),
      });
      updateHits(tiles[random].type);
      if (tiles[random].type !== 'tile') {
        setLastHit(random);
        setFirstHit(random);
      }
    } else {
      //!
      makeCompMove(...args);
    }
  };

  //+ check prediction is in bounds then check array to see if all tiles hit
  const checkRelative = (arr, curHit, tiles) =>
    arr.every((item) => {
      if (checkPrediction(item + curHit) === false) {
        if (tiles[curHit + item].hit === true) {
          return true;
        }
      } else {
        return true;
      }
    });

  //+ check array to see if all tiles hit

  const doubleCheckRelative = (arr, curHit, tiles) => {
    arr.every((item) => {
      if (tiles[curHit + item].hit === true) {
        return true;
      }
    });
  };

  //+ execute the predicted move
  const makePredictedMove = (prediction, getPos, ...args) => {
    console.log('make predicted move');
    setTiles((old) => [...old], {
      [tiles[prediction]]: (tiles[prediction].hit = true),
    });
    updateHits(tiles[prediction].type);
    if (tiles[prediction].type !== 'tile') {
      setLastHit(prediction);
      // set ship rotation
      if (getPos === -10 || getPos === 10) {
        setRotate([2, 3]);
      } else {
        setRotate([0, 1]);
      }
    }
  };

  //+ make moves if prediction is a valid tile
  const makeMove = (prediction, getPos, newArr, ...args) => {
    if (tiles[prediction].hit === false) {
      makePredictedMove(prediction, getPos);
    } else if (checkRelative(newArr, lastHit, tiles) === false) {
      console.log('make move if available tiles after lastHit');
      //!
      makeCompMove(...args);
    } else if (checkRelative(newArr, firstHit, tiles) === false) {
      // check first hit
      console.log('go back to first hit and predict');
      setLastHit(firstHit);
      setRestart('restart' + turn);
    } else {
      console.log('decide reset hit or set last hit as first');
      setRotate([0, 3]);
      if (doubleCheckRelative(newArr, firstHit, tiles) === false) {
        setLastHit(firstHit);
      } else {
        setLastHit(-100);
      }
      setRestart('restart' + turn);
    }
  };

  //+ make predicted move
  const predictMove = (...args) => {
    let pos = [-1, 1, -10, 10];
    const getPos = pos[randomNumRange(rotate[0], rotate[1])];
    const prediction = lastHit + getPos;
    const newArr = pos.slice(rotate[0], rotate[1] + 1);

    if (checkPrediction(prediction) === false) {
      makeMove(prediction, getPos, newArr);
    } else if (checkRelative(newArr, lastHit, tiles) === true) {
      console.log('all tiles invalid reset');
      setRotate([0, 3]);
      setLastHit(firstHit);
      setRestart('restart' + turn);
    } else {
      console.log('restart make comp move');
      //!
      makeCompMove(...args);
    }
  };

  //# make comp move
  const makeCompMove = (...args) => {
    console.log('make comp move');
    if (player === 'user' && turn > 0) {
      if (lastHit === -100) {
        randomMove(...args);
      } else {
        predictMove(...args);
      }
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
    makeCompMove(
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
      setRestart
    );
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
