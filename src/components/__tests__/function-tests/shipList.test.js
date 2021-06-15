import shipList from '../../functions/shipList';
import '@testing-library/jest-dom/extend-expect';

test('expects object to equal user carrier', () => {
  expect(shipList('user')[0]).toEqual({
    shipType: 'Carrier',
    sizeHor: [0, 1, 2, 3, 4],
    sizeVer: [0, 10, 20, 30, 40],
    hits: 0,
    sunk: false,
    key: `user Carrier`,
  });
});

test('expects object to equal comps destroyer', () => {
  expect(shipList('comp')[4]).toEqual({
    shipType: 'Destroyer',
    sizeHor: [0, 1],
    sizeVer: [0, 10],
    hits: 0,
    sunk: false,
    key: `comp Destroyer`,
  });
});
