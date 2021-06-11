import React from 'react';
import Board from './Board';
import '../styles/game.css';

const Game = () => {
  return (
    <div id="game">
      <Board player={'user'} />
      <Board player={'comp'} />
    </div>
  );
};

export default Game;
