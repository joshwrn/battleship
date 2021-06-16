import React, { useState } from 'react';
import Board from './Board';
import '../styles/game.css';

const Game = () => {
  const [gameStatus, setGameStatus] = useState('playing');
  const [restart, setRestart] = useState('');
  const [turn, setTurn] = useState(0);
  const [resetGame, setResetGame] = useState(false);

  const handleReset = () => {
    resetGame ? setResetGame(false) : setResetGame(true);
  };

  return (
    <div id="game-container">
      <p id="game-over">React Battleship</p>
      <div id="game">
        <Board
          player="user"
          gameStatus={gameStatus}
          setGameStatus={setGameStatus}
          turn={turn}
          setTurn={setTurn}
          restart={restart}
          setRestart={setRestart}
          resetGame={resetGame}
          setResetGame={setResetGame}
        />
        <Board
          player="comp"
          gameStatus={gameStatus}
          setGameStatus={setGameStatus}
          turn={turn}
          setTurn={setTurn}
          restart={restart}
          setRestart={setRestart}
          resetGame={resetGame}
          setResetGame={setResetGame}
        />
      </div>
      <p id="game-over">
        {gameStatus !== 'playing' ? gameStatus : 'Turn: ' + turn}
      </p>
      <button id="reset-button" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default Game;
