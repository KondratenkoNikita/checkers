import React, { useEffect, useState } from 'react';
import Board from './Board';
import './App.css';

const BOARD_INIT = [
  { color: 'white', checker: null, isKing: false, id: 1 },
  { color: 'black', checker: null, isKing: false, id: 2 },
  { color: 'white', checker: null, isKing: false, id: 3 },
  { color: 'black', checker: null, isKing: false, id: 4 },
  { color: 'white', checker: null, isKing: false, id: 5 },
  { color: 'black', checker: null, isKing: false, id: 6 },
  { color: 'white', checker: null, isKing: false, id: 7 },
  { color: 'black', checker: null, isKing: false, id: 8 },
  { color: 'black', checker: null, isKing: false, id: 9 },
  { color: 'white', checker: null, isKing: false, id: 10 },
  { color: 'black', checker: null, isKing: false, id: 11 },
  { color: 'white', checker: null, isKing: false, id: 12 },
  { color: 'black', checker: null, isKing: false, id: 13 },
  { color: 'white', checker: null, isKing: false, id: 14 },
  { color: 'black', checker: null, isKing: false, id: 15 },
  { color: 'white', checker: null, isKing: false, id: 16 },
  { color: 'white', checker: null, isKing: false, id: 17 },
  { color: 'black', checker: null, isKing: false, id: 18 },
  { color: 'white', checker: null, isKing: false, id: 19 },
  { color: 'black', checker: null, isKing: false, id: 20 },
  { color: 'white', checker: null, isKing: false, id: 21 },
  { color: 'black', checker: null, isKing: false, id: 22 },
  { color: 'white', checker: null, isKing: false, id: 23 },
  { color: 'black', checker: null, isKing: false, id: 24 },
  { color: 'black', checker: null, isKing: false, id: 25 },
  { color: 'white', checker: null, isKing: false, id: 26 },
  { color: 'black', checker: null, isKing: false, id: 27 },
  { color: 'white', checker: null, isKing: false, id: 28 },
  { color: 'black', checker: null, isKing: false, id: 29 },
  { color: 'white', checker: null, isKing: false, id: 30 },
  { color: 'black', checker: null, isKing: false, id: 31 },
  { color: 'white', checker: null, isKing: false, id: 32 },
  { color: 'white', checker: null, isKing: false, id: 33 },
  { color: 'black', checker: null, isKing: false, id: 34 },
  { color: 'white', checker: null, isKing: false, id: 35 },
  { color: 'black', checker: null, isKing: false, id: 36 },
  { color: 'white', checker: null, isKing: false, id: 37 },
  { color: 'black', checker: null, isKing: false, id: 38 },
  { color: 'white', checker: null, isKing: false, id: 39 },
  { color: 'black', checker: null, isKing: false, id: 40 },
  { color: 'black', checker: null, isKing: false, id: 41 },
  { color: 'white', checker: null, isKing: false, id: 42 },
  { color: 'black', checker: null, isKing: false, id: 43 },
  { color: 'white', checker: null, isKing: false, id: 44 },
  { color: 'black', checker: null, isKing: false, id: 45 },
  { color: 'white', checker: null, isKing: false, id: 46 },
  { color: 'black', checker: null, isKing: false, id: 47 },
  { color: 'white', checker: null, isKing: false, id: 48 },
  { color: 'white', checker: null, isKing: false, id: 49 },
  { color: 'black', checker: null, isKing: false, id: 50 },
  { color: 'white', checker: null, isKing: false, id: 51 },
  { color: 'black', checker: null, isKing: false, id: 52 },
  { color: 'white', checker: null, isKing: false, id: 53 },
  { color: 'black', checker: null, isKing: false, id: 54 },
  { color: 'white', checker: null, isKing: false, id: 55 },
  { color: 'black', checker: null, isKing: false, id: 56 },
  { color: 'black', checker: null, isKing: false, id: 57 },
  { color: 'white', checker: null, isKing: false, id: 58 },
  { color: 'black', checker: null, isKing: false, id: 59 },
  { color: 'white', checker: null, isKing: false, id: 60 },
  { color: 'black', checker: null, isKing: false, id: 61 },
  { color: 'white', checker: null, isKing: false, id: 62 },
  { color: 'black', checker: null, isKing: false, id: 63 },
  { color: 'white', checker: null, isKing: false, id: 64 },
]


function App() {
  const [board, setBoard] = useState(BOARD_INIT);
  const start = () => {
    const checkersWhite = [2,4,6,8,9,11,13,15,18,20,22,24];
    const checkersBlack = [63,61,59,57,56,54,52,50,47,45,43,41];
    board.map((cell) => {
      if (checkersWhite.find(checker => checker === cell.id)) {
         cell.checker = 'white';
      }
      if (checkersBlack.find(checker => checker === cell.id)) {
         cell.checker = 'black';
      }
    });
    console.log('start');
    console.log(board, 'board');
    setBoard(board);
  }
  useEffect(() => {

  }, [])
  return (
    <div className="wrapper">
      <div className="checkers">
        <Board board={board} />
      </div>

        <button onClick={start}>Start</button>
    </div>
  );
}

export default App;
