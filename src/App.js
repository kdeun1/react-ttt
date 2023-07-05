import { useState } from 'react';
import './App.css';
import Board from './components/Board/Board';

const App = () => {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(''),
    },
  ]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNum, setStepNum] = useState(0);

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

  const current = history[stepNum];
  const winner = calculateWinner(current.squares);
  const getCurrentPlayer = flag => (flag ? 'X' : 'O');

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${getCurrentPlayer(xIsNext)}`;
  }

  const handleClick = i => {
    const newHistory = history.slice(0, stepNum + 1);
    const newCurrent = newHistory[newHistory.length - 1];
    const newSqueres = newCurrent.squares.slice();

    if (calculateWinner(newSqueres) || newSqueres[i]) {
      return;
    }

    newSqueres[i] = getCurrentPlayer(xIsNext);
    setHistory([...newHistory, { squares: newSqueres }]);
    setXIsNext(prev => !prev);

    setStepNum(newHistory.length);
  };

  const jumpTo = step => {
    setStepNum(step);
    setXIsNext(step % 2 === 0);
  };

  const moves = history.map((step, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button className="move-button" onClick={() => jumpTo(move)}>
          {desc}
        </button>
      </li>
    );
  });

  return (
    <div className="ttt-viewport">
      <div className="ttt-board">
        <Board squares={current.squares} onClick={i => handleClick(i)} />
      </div>
      <div className="ttt-info">
        <div className="board-status">{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default App;
