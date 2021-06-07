import React from 'react';
import Board from './Board';
import '../styles/game.css';

const Game = () => {
  return (
    <div id="game">
      <Board />
      <Board />
    </div>
  );
};

export default Game;
