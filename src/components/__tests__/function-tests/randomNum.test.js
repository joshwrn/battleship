import randomNum from '../../functions/randomNum';
import '@testing-library/jest-dom/extend-expect';

test('makes sure number isnt too high or low', () => {
  expect(randomNum(99)).toBeGreaterThanOrEqual(0);
  expect(randomNum(99)).toBeLessThanOrEqual(99);
  expect(randomNum(10)).toBeGreaterThanOrEqual(0);
  expect(randomNum(10)).toBeLessThanOrEqual(10);
});
