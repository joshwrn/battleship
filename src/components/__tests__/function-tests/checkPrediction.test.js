import checkPrediction from '../../functions/checkPrediction';
import '@testing-library/jest-dom/extend-expect';

test('check if number is outside board range', () => {
  expect(checkPrediction(100)).toBeTruthy();
  expect(checkPrediction(99)).toBeFalsy();
  expect(checkPrediction(-10)).toBeTruthy();
  expect(checkPrediction(0)).toBeFalsy();
  expect(checkPrediction(50)).toBeFalsy();
});
