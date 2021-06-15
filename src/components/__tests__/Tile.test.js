import React from 'react';
import Tile from '../Tile';
import { render, toHaveAttribute, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('expect correct data-type', () => {
  const component = render(
    <Tile id="55comp" taken="false" type="tile" click={null} hit={false} />
  );
  const tileEl = component.getByTestId('tile');
  expect(tileEl).toHaveAttribute('data-type', 'tile');
});

test('expect correct class', () => {
  const component = render(
    <Tile id="55user" taken="true" type="Battleship" click={null} hit={false} />
  );
  const tileEl = component.getByTestId('tile');
  expect(tileEl).toHaveClass('ship');
});
