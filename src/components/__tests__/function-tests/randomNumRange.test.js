import randomNumRange from '../../functions/randomNumRange';
import '@testing-library/jest-dom/extend-expect';

test('expects returned number to be within min max range', () => {
  expect(randomNumRange(5, 10)).toBeGreaterThanOrEqual(5);
  expect(randomNumRange(5, 10)).toBeLessThanOrEqual(10);
  expect(randomNumRange(50, 100)).toBeGreaterThanOrEqual(50);
  expect(randomNumRange(50, 100)).toBeLessThanOrEqual(100);
});
