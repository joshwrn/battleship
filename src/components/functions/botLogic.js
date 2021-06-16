import checkPrediction from './checkPrediction';
import randomNum from './randomNum';
import randomNumRange from './randomNumRange';

//+ make random move
const randomMove = ({ ...args }) => {
  const { tiles, setTiles, updateHits, setLastHit, setFirstHit } = { ...args };
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
    makeCompMove({ ...args });
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
const makePredictedMove = ({ ...args }, prediction, getPos) => {
  const { tiles, setTiles, updateHits, setRotate, setLastHit } = { ...args };
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
const makeMove = ({ ...args }, prediction, getPos, newArr) => {
  const { tiles, turn, setRotate, lastHit, setLastHit, firstHit, setRestart } =
    { ...args };

  if (tiles[prediction].hit === false) {
    makePredictedMove({ ...args }, prediction, getPos);
  } else if (checkRelative(newArr, lastHit, tiles) === false) {
    console.log('make move if available tiles after lastHit');
    //!
    makeCompMove({ ...args });
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
const predictMove = ({ ...args }) => {
  const {
    tiles,
    turn,
    lastHit,
    rotate,
    setRotate,
    setLastHit,
    firstHit,
    setRestart,
  } = { ...args };
  let pos = [-1, 1, -10, 10];
  const getPos = pos[randomNumRange(rotate[0], rotate[1])];
  const prediction = lastHit + getPos;
  const newArr = pos.slice(rotate[0], rotate[1] + 1);

  if (checkPrediction(prediction) === false) {
    makeMove({ ...args }, prediction, getPos, newArr);
  } else if (checkRelative(newArr, lastHit, tiles) === true) {
    console.log('all tiles invalid reset');
    setRotate([0, 3]);
    setLastHit(firstHit);
    setRestart('restart' + turn);
  } else {
    console.log('restart make comp move');
    //!
    makeCompMove({ ...args });
  }
};

//# make comp move
const makeCompMove = ({ ...args }) => {
  console.log('make comp move');
  const { player, turn, lastHit } = { ...args };
  if (player === 'user' && turn > 0) {
    if (lastHit === -100) {
      randomMove({ ...args });
    } else {
      predictMove({ ...args });
    }
  }
};

export default makeCompMove;
