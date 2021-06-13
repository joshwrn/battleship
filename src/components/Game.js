import React, { useState } from 'react';
import Board from './Board';
import '../styles/game.css';

const Game = () => {
  const [gameStatus, setGameStatus] = useState('playing');
  const [turn, setTurn] = useState(0);
  return (
    <div id="game-container">
      <div id="game">
        <Board
          player={'user'}
          gameStatus={gameStatus}
          setGameStatus={setGameStatus}
          turn={turn}
          setTurn={setTurn}
        />
        <Board
          player={'comp'}
          gameStatus={gameStatus}
          setGameStatus={setGameStatus}
          turn={turn}
          setTurn={setTurn}
        />
      </div>
      <p id="game-over">
        {gameStatus !== 'playing' ? gameStatus : 'Turn: ' + turn}
      </p>
    </div>
  );
};

export default Game;
