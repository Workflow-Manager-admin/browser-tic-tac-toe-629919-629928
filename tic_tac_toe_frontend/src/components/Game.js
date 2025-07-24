import React, { useState } from 'react';

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    const winner = calculateWinner(newBoard);
    if (winner) {
      setScores(prev => ({
        ...prev,
        [winner]: prev[winner] + 1
      }));
    }

    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const resetScores = () => {
    setScores({ X: 0, O: 0 });
    resetGame();
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(cell => cell !== null);
  const status = winner 
    ? `Winner: ${winner}` 
    : isDraw 
    ? "It's a draw!" 
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="game-container">
      <h1 className="game-title">Tic Tac Toe</h1>
      
      <div className="scoreboard">
        <div className={`score-card ${isXNext ? 'active' : ''}`}>
          Player X: {scores.X}
        </div>
        <div className={`score-card ${!isXNext ? 'active' : ''}`}>
          Player O: {scores.O}
        </div>
      </div>

      <div className="game-status">{status}</div>

      <div className="board">
        {board.map((value, index) => (
          <button
            key={index}
            className={`cell ${value?.toLowerCase()}`}
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>

      <div className="controls">
        <button className="btn btn-primary" onClick={resetGame}>
          New Game
        </button>
        <button className="btn btn-secondary" onClick={resetScores}>
          Reset Scores
        </button>
      </div>
    </div>
  );
};

export default Game;
