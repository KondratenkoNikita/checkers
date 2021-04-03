import React, { useEffect, useState } from 'react';
import Board from './components/Board/Board';
import './App.css';

const BOARD_INIT = [
  { cellColor: 'white', row: 1, column: 1, checkerColor: null, isKing: false, id: 1 },
  { cellColor: 'black', row: 1, column: 2, checkerColor: null, isKing: false, id: 2 },
  { cellColor: 'white', row: 1, column: 3, checkerColor: null, isKing: false, id: 3 },
  { cellColor: 'black', row: 1, column: 4, checkerColor: null, isKing: false, id: 4 },
  { cellColor: 'white', row: 1, column: 5, checkerColor: null, isKing: false, id: 5 },
  { cellColor: 'black', row: 1, column: 6, checkerColor: null, isKing: false, id: 6 },
  { cellColor: 'white', row: 1, column: 7, checkerColor: null, isKing: false, id: 7 },
  { cellColor: 'black', row: 1, column: 8, checkerColor: null, isKing: false, id: 8 },
  { cellColor: 'black', row: 2, column: 1, checkerColor: null, isKing: false, id: 9 },
  { cellColor: 'white', row: 2, column: 2, checkerColor: null, isKing: false, id: 10 },
  { cellColor: 'black', row: 2, column: 3, checkerColor: null, isKing: false, id: 11 },
  { cellColor: 'white', row: 2, column: 4, checkerColor: null, isKing: false, id: 12 },
  { cellColor: 'black', row: 2, column: 5, checkerColor: null, isKing: false, id: 13 },
  { cellColor: 'white', row: 2, column: 6, checkerColor: null, isKing: false, id: 14 },
  { cellColor: 'black', row: 2, column: 7, checkerColor: null, isKing: false, id: 15 },
  { cellColor: 'white', row: 2, column: 8, checkerColor: null, isKing: false, id: 16 },
  { cellColor: 'white', row: 3, column: 1, checkerColor: null, isKing: false, id: 17 },
  { cellColor: 'black', row: 3, column: 2, checkerColor: null, isKing: false, id: 18 },
  { cellColor: 'white', row: 3, column: 3, checkerColor: null, isKing: false, id: 19 },
  { cellColor: 'black', row: 3, column: 4, checkerColor: null, isKing: false, id: 20 },
  { cellColor: 'white', row: 3, column: 5, checkerColor: null, isKing: false, id: 21 },
  { cellColor: 'black', row: 3, column: 6, checkerColor: null, isKing: false, id: 22 },
  { cellColor: 'white', row: 3, column: 7, checkerColor: null, isKing: false, id: 23 },
  { cellColor: 'black', row: 3, column: 8, checkerColor: null, isKing: false, id: 24 },
  { cellColor: 'black', row: 4, column: 1, checkerColor: null, isKing: false, id: 25 },
  { cellColor: 'white', row: 4, column: 2, checkerColor: null, isKing: false, id: 26 },
  { cellColor: 'black', row: 4, column: 3, checkerColor: null, isKing: false, id: 27 },
  { cellColor: 'white', row: 4, column: 4, checkerColor: null, isKing: false, id: 28 },
  { cellColor: 'black', row: 4, column: 5, checkerColor: null, isKing: false, id: 29 },
  { cellColor: 'white', row: 4, column: 6, checkerColor: null, isKing: false, id: 30 },
  { cellColor: 'black', row: 4, column: 7, checkerColor: null, isKing: false, id: 31 },
  { cellColor: 'white', row: 4, column: 8, checkerColor: null, isKing: false, id: 32 },
  { cellColor: 'white', row: 5, column: 1, checkerColor: null, isKing: false, id: 33 },
  { cellColor: 'black', row: 5, column: 2, checkerColor: null, isKing: false, id: 34 },
  { cellColor: 'white', row: 5, column: 3, checkerColor: null, isKing: false, id: 35 },
  { cellColor: 'black', row: 5, column: 4, checkerColor: null, isKing: false, id: 36 },
  { cellColor: 'white', row: 5, column: 5, checkerColor: null, isKing: false, id: 37 },
  { cellColor: 'black', row: 5, column: 6, checkerColor: null, isKing: false, id: 38 },
  { cellColor: 'white', row: 5, column: 7, checkerColor: null, isKing: false, id: 39 },
  { cellColor: 'black', row: 5, column: 8, checkerColor: null, isKing: false, id: 40 },
  { cellColor: 'black', row: 6, column: 1, checkerColor: null, isKing: false, id: 41 },
  { cellColor: 'white', row: 6, column: 2, checkerColor: null, isKing: false, id: 42 },
  { cellColor: 'black', row: 6, column: 3, checkerColor: null, isKing: false, id: 43 },
  { cellColor: 'white', row: 6, column: 4, checkerColor: null, isKing: false, id: 44 },
  { cellColor: 'black', row: 6, column: 5, checkerColor: null, isKing: false, id: 45 },
  { cellColor: 'white', row: 6, column: 6, checkerColor: null, isKing: false, id: 46 },
  { cellColor: 'black', row: 6, column: 7, checkerColor: null, isKing: false, id: 47 },
  { cellColor: 'white', row: 6, column: 8, checkerColor: null, isKing: false, id: 48 },
  { cellColor: 'white', row: 7, column: 1, checkerColor: null, isKing: false, id: 49 },
  { cellColor: 'black', row: 7, column: 2, checkerColor: null, isKing: false, id: 50 },
  { cellColor: 'white', row: 7, column: 3, checkerColor: null, isKing: false, id: 51 },
  { cellColor: 'black', row: 7, column: 4, checkerColor: null, isKing: false, id: 52 },
  { cellColor: 'white', row: 7, column: 5, checkerColor: null, isKing: false, id: 53 },
  { cellColor: 'black', row: 7, column: 6, checkerColor: null, isKing: false, id: 54 },
  { cellColor: 'white', row: 7, column: 7, checkerColor: null, isKing: false, id: 55 },
  { cellColor: 'black', row: 7, column: 8, checkerColor: null, isKing: false, id: 56 },
  { cellColor: 'black', row: 8, column: 1, checkerColor: null, isKing: false, id: 57 },
  { cellColor: 'white', row: 8, column: 2, checkerColor: null, isKing: false, id: 58 },
  { cellColor: 'black', row: 8, column: 3, checkerColor: null, isKing: false, id: 59 },
  { cellColor: 'white', row: 8, column: 4, checkerColor: null, isKing: false, id: 60 },
  { cellColor: 'black', row: 8, column: 5, checkerColor: null, isKing: false, id: 61 },
  { cellColor: 'white', row: 8, column: 6, checkerColor: null, isKing: false, id: 62 },
  { cellColor: 'black', row: 8, column: 7, checkerColor: null, isKing: false, id: 63 },
  { cellColor: 'white', row: 8, column: 8, checkerColor: null, isKing: false, id: 64 },
];
const CHECKERS_WHITE = [2,4,6,8,9,11,13,15,18,20,22,24];
const CHECKERS_BLACK = [63,61,59,57,56,54,52,50,47,45,43,41];
const HORIZONTAL_NUMBERING = ['a','b','c','d','e','f','h','g'];
const VERTICAL_NUMBERING = [1,2,3,4,5,6,7,8];
const START_BOARD = [...BOARD_INIT.map((cell) => {
  if (CHECKERS_WHITE.find(checker => checker === cell.id)) {
    cell.checkerColor = 'white';
  }
  if (CHECKERS_BLACK.find(checker => checker === cell.id)) {
    cell.checkerColor = 'black';
  }
  return cell;
})];
function App() {
  const [board, setBoard] = useState(BOARD_INIT);

  const start = () => {
    setBoard(START_BOARD);
  };

  return (
    <div className="wrapper">
      <div className="margin marginRowTop">
        {HORIZONTAL_NUMBERING.reverse().map((item) => <span>{item.toUpperCase()}</span>)}
      </div>
      <div className="margin marginColumnLeft">
        {VERTICAL_NUMBERING.reverse().map((item) => <span>{item}</span>)}
      </div>
      <div className="board">
        <Board
          board={board}
          setBoard={setBoard}
        />
      </div>
      <div className="margin marginRowBottom">
        {HORIZONTAL_NUMBERING.map((item) => <span>{item.toUpperCase()}</span>)}
      </div>
      <div className="margin marginColumnRight">
        {VERTICAL_NUMBERING.map((item) => <span>{item}</span>)}
      </div>
      {/*<button onClick={start}>Reset</button>*/}
    </div>
  );
};

export default App;
