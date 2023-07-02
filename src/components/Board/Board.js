import { useState } from 'react';
import './Board.css';
import Square from '../Square/Square';

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(''));
  const [xIsNext, setXIsNext] = useState(true);

  const currentPlayer = flag => (flag ? 'X' : 'O');

  const calculateWinner = arr => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (arr[a] && arr[a] === arr[b] && arr[a] === arr[c]) {
        return arr[a];
      }
    }
    return null;
  };

  let status;
  const winner = calculateWinner(squares);
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${currentPlayer(xIsNext)}`;
  }

  const handleClick = i => {
    const newSqueres = squares.slice();
    if (calculateWinner(newSqueres) || newSqueres[i]) {
      return;
    }
    newSqueres[i] = currentPlayer(xIsNext);
    setSquares(newSqueres);
    setXIsNext(prev => !prev);
  };
  const renderSquare = i => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  };

  return (
    <div>
      <div className="board-status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default Board;
