import React, { useState, useEffect } from 'react';
import Tile from './Tile';
import '../styles/board.css';

const Board = ({ player, gameStatus, setGameStatus, turn, setTurn }) => {
  const [tiles, setTiles] = useState([]);
  const [lastHit, setLastHit] = useState(-100);
  const [firstHit, setFirstHit] = useState('');
  const [restart, setRestart] = useState('');
  const [rotate, setRotate] = useState([0, 3]);
  const [sunk, setSunk] = useState([]);
  const [ships, setShips] = useState([
    {
      shipType: 'Carrier',
      sizeHor: [0, 1, 2, 3, 4],
      sizeVer: [0, 10, 20, 30, 40],
      hits: 0,
      sunk: false,
      key: `${player} Carrier`,
    },
    {
      shipType: 'Battleship',
      sizeHor: [0, 1, 2, 3],
      sizeVer: [0, 10, 20, 30],
      hits: 0,
      sunk: false,
      key: `${player} Battleship`,
    },
    {
      shipType: 'Cruiser',
      sizeHor: [0, 1, 2],
      sizeVer: [0, 10, 20],
      hits: 0,
      sunk: false,
      key: `${player} Cruiser`,
    },
    {
      shipType: 'Submarine',
      sizeHor: [0, 1, 2],
      sizeVer: [0, 10, 20],
      hits: 0,
      sunk: false,
      key: `${player} Submarine`,
    },
    {
      shipType: 'Destroyer',
      sizeHor: [0, 1],
      sizeVer: [0, 10],
      hits: 0,
      sunk: false,
      key: `${player} Destroyer`,
    },
  ]);
  const newTiles = [];

  //+ random int
  const randomNum = (max) => {
    return Math.floor(Math.random() * max);
  };

  //+ random from range
  const randomNumRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
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
      return ships[i].sizeHor;
    } else {
      return ships[i].sizeVer;
    }
  };

  //+ create a ship
  const createShip = (i) => {
    const directions = chooseDirection(i);
    let width = 1;
    if (directions === ships[i].sizeVer) {
      width = 10;
    }
    const start = randomNum(newTiles.length - directions.length * width);
    const type = ships[i].shipType;
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

  //+ check all
  const checkAll = (newArr, lastHit) => {
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i] + lastHit < 0 || newArr[i] + lastHit > 99) {
        newArr.splice(i, 1);
      }
    }
  };

  const checkPrediction = (num) => {
    if (num < 0 || num > 99) {
      return true;
    } else {
      return false;
    }
  };

  //# make comp move
  const makeCompMove = () => {
    if (player === 'user' && turn > 0) {
      if (lastHit === -100) {
        console.log('first');
        const random = randomNum(100);
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
          makeCompMove();
        }
      } else {
        let pos = [-1, 1, -10, 10];

        const getPos = pos[randomNumRange(rotate[0], rotate[1])];

        const prediction = lastHit + getPos;

        const newArr = pos.slice(rotate[0], rotate[1] + 1);

        const check = (arr, curHit) =>
          arr.every((item) => {
            if (checkPrediction(item + curHit) === false) {
              if (tiles[curHit + item].hit === true) {
                return true;
              }
            } else {
              return true;
            }
          });

        console.log(prediction);
        console.log(checkPrediction(prediction));
        if (checkPrediction(prediction) === false) {
          if (tiles[prediction].hit === false) {
            console.log('2nd 1');
            setTiles((old) => [...old], {
              [tiles[prediction]]: (tiles[prediction].hit = true),
            });
            updateHits(tiles[prediction].type);
            if (tiles[prediction].type !== 'tile') {
              setLastHit(prediction);
              if (getPos === -10 || getPos === 10) {
                setRotate([2, 3]);
              } else {
                setRotate([0, 1]);
              }
            }
          } else if (check(newArr, lastHit) === false) {
            console.log('2nd 2');
            makeCompMove();
          } else if (check(newArr, firstHit) === false) {
            // check first hit
            console.log('2nd 3');
            console.log(rotate);
            console.log(lastHit);
            setRotate([0, 3]);
            setLastHit(firstHit);
            setRestart('restart');
          } else {
            setRotate([0, 3]);
            setLastHit(firstHit);
            setRestart('restart');
          }
        } else if (check(newArr, lastHit) === true) {
          setRotate([0, 3]);
          setLastHit(firstHit);
          setRestart('restart');
        } else {
          makeCompMove();
        }
      }
    }
  };

  useEffect(() => {
    makeCompMove();
  }, [restart]);

  useEffect(() => {
    setLastHit(-100);
    console.log('sunk'); //updates every ship it after first sunk
    setRotate([0, 3]);
  }, [sunk]);

  //+ on turn update move
  useEffect(() => {
    makeCompMove();
  }, [turn]);

  //+ set sunk list and game over
  useEffect(() => {
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
