let shipList = (player) => [
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
];

export default shipList;
