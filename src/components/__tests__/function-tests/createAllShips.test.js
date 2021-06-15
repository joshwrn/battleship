import {
  checkEdge,
  checkTaken,
  checkPosition,
  chooseDirection,
  createShip,
  createAllShips,
} from '../../functions/createAllShips';
import '@testing-library/jest-dom/extend-expect';

test('expect function to check for edge', () => {
  expect(checkEdge([0, 1, 2, 3, 4], 47)).toBeTruthy;
  expect(checkEdge([0, 1, 2, 3, 4], 50)).toBeFalsy;
});

test('expect function to check if tile has already been chosen', () => {
  expect(checkEdge([0, 1, 2, 3, 4], 47)).toBeTruthy;
  expect(checkEdge([0, 1, 2, 3, 4], 50)).toBeFalsy;
});
