import React, { useState } from 'react';
import Board from './Board';
import '../styles/game.css';

const Game = () => {
  const [gameStatus, setGameStatus] = useState('playing');
  return (
    <div id="game-container">
      <div id="game">
        <Board
          player={'user'}
          gameStatus={gameStatus}
          setGameStatus={setGameStatus}
        />
        <Board
          player={'comp'}
          gameStatus={gameStatus}
          setGameStatus={setGameStatus}
        />
      </div>
      <p id="game-over">{gameStatus === 'over' ? 'Game Over' : 'Playing'}</p>
    </div>
  );
};

export default Game;
