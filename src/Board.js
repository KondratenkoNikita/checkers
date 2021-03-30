import React, { useEffect, useState } from 'react';
import Cell from './Cell';
import './App.css';

export const ACTIVE_CELL_INIT = {
  from: null,
  to: null,
  checkerColor: null,
  fromRow: null,
  columnFrom: null,
}

function Board({board, setBoard}) {
  const [activeCellId, setActiveCellId] = useState(ACTIVE_CELL_INIT);

  const updatedBoard = () => {
    const updatedBoard = [ ...board.map(cell => {
      if (cell.id === activeCellId.from) {
        cell.checkerColor = null;
      }
      if (cell.id === activeCellId.to) {
        cell.checkerColor = activeCellId.checkerColor;
      }
      return cell
    })];
    setBoard(updatedBoard);
  };

  useEffect(() => {
    if (activeCellId.to !== null) updatedBoard();
  }, [activeCellId]);

  useEffect(() => {
    setActiveCellId(ACTIVE_CELL_INIT);
  }, [board]);

  const handlerStep = (id, checkerColor, cellColor, row, column) => {
    const checkRow = activeCellId.checkerColor === 'white'
      ? row === activeCellId.rowFrom + 1
      : row === activeCellId.rowFrom - 1;
    const checkColumn = activeCellId.columnFrom + 1 ||
      column === activeCellId.columnFrom - 1;
    const isValidFrom = checkerColor !== null &&
      cellColor === 'black' &&
      activeCellId.from === null;
    const isValidTo = cellColor === 'black' &&
      checkRow &&
      checkColumn;

    if (isValidFrom) { //if valid, then set info about checkerColor which a make move
      setActiveCellId({
        ...activeCellId,
        from: id,
        checkerColor,
        rowFrom: row,
        columnFrom: column,
      });
    } else if (isValidTo) { //is valid, then get info and set about cell where do I want put checkerColor
      setActiveCellId({ ...activeCellId, to: id });
    } else if (activeCellId.from !== null && activeCellId.to === null) {
      setActiveCellId(ACTIVE_CELL_INIT);
    }
  };

  return (
    board.map((cell) => (
      <Cell
        cell={cell}
        board={board}
        setBoard={setBoard}
        activeCellId={activeCellId}
        setActiveCellId={setActiveCellId}
        handlerStep={handlerStep}
      />
    ))
  );
}

export default Board;
