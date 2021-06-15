import randomNum from './randomNum';

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
//+ Check for other ships
const checkTaken = (directions, start, arr) => {
  if (
    directions.some((index) => {
      if (arr[start + index].taken === true) {
        return true;
      }
    })
  ) {
    return true;
  }
};

//+ check for edge and other ships
const checkPosition = (start, directions, arr) => {
  if (
    checkEdge(directions, start) === true ||
    checkTaken(directions, start, arr) === true
  ) {
    return true;
  }
};

//+ decide direction
const chooseDirection = (i, ships) => {
  if (randomNum(2) === 1) {
    return ships[i].sizeHor;
  } else {
    return ships[i].sizeVer;
  }
};

//+ create a ship
const createShip = (i, arr, ships) => {
  const directions = chooseDirection(i, ships);
  let width = 1;
  if (directions === ships[i].sizeVer) {
    width = 10;
  }
  const start = randomNum(arr.length - directions.length * width);
  const type = ships[i].shipType;
  if (checkPosition(start, directions, arr) !== true) {
    directions.map((position) => {
      arr[start + position].taken = true;
      arr[start + position].type = type;
    });
  } else {
    createShip(i, arr, ships);
  }
};

//+ loop and create all ships
const createAllShips = (arr, ships) => {
  for (let i = 0; i < 5; i++) {
    createShip(i, arr, ships);
  }
};

export {
  checkEdge,
  checkTaken,
  checkPosition,
  chooseDirection,
  createShip,
  createAllShips,
};
