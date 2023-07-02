import './App.css';
import Board from './components/Board/Board';

function App() {
  return (
    <div className="ttt-viewport">
      <div className="ttt-board">
        <Board />
      </div>
      <div className="ttt-info">인포</div>
    </div>
  );
}

export default App;
