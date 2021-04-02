import React, { useEffect, useState } from 'react';
import Cell from './Cell';
import './App.css';

export const ACTIVE_CELL_INIT = {
  fromId: null,
  fromRow: null,
  fromColumn: null,
  fromColor: null,
  toId: null,
  isKing: false,
  checkerColor: null,
};

function Board({board, setBoard}) {
  const [activeCellId, setActiveCellId] = useState(ACTIVE_CELL_INIT);

  const eatChecker = (rowEat, columnEat, toId, isKing) => {
    let updatedBoard = [];
    const cellEat = board.find(({row, column}) => row === rowEat && column === columnEat);
    const isValidEat = activeCellId.checkerColor !== cellEat.checkerColor && cellEat.checkerColor !== null;
    if (isValidEat) {
      updatedBoard = [ ...board.map(cell => {
        if (cell.id === cellEat.id) {
          return { ...cell, checkerColor: null, isKing: null };
        }
        if (cell.id === toId) {
          return { ...cell, checkerColor: activeCellId.fromColor, isKing };
        }
        if (cell.id === activeCellId.fromId) {
          return { ...cell, checkerColor: null, isKing: null };
        }
        return cell
      })];
      setBoard(updatedBoard);
    }
  }

  const updateBoard = () => {
    const updatedBoard = [ ...board.map(cell => {
      if (cell.id === activeCellId.fromId) {
       return { ...cell, checkerColor: null, isKing: null };
      }
      if (cell.id === activeCellId.toId) {
        return { ...cell, checkerColor: activeCellId.checkerColor, isKing: activeCellId.isKing };
      }
      return cell
    })];
    setBoard(updatedBoard);
  };

  useEffect(() => {
    if (activeCellId.toId !== null) updateBoard();
  }, [activeCellId]);

  useEffect(() => {
    setActiveCellId(ACTIVE_CELL_INIT);
  }, [board]);

  const handlerStep = (id, checkerColor, cellColor, row, column, isKing) => {
    const correctRow = activeCellId.checkerColor === 'white'
      ? row === activeCellId.fromRow + 1
      : row === activeCellId.fromRow - 1;

    const checkColumn = activeCellId.fromColumn + 1 || column === activeCellId.fromColumn - 1;

    const isValidFrom = checkerColor !== null && cellColor === 'black' && activeCellId.fromId === null;

    const isValidToStep = cellColor === 'black' && checkerColor === null && correctRow && checkColumn;

    let checkStepKing = null;

    if (activeCellId.isKing) {
      const checkColumnToKing = column - activeCellId.fromColumn;
      const checkRowToKing = row - activeCellId.fromRow;
      checkStepKing = Math.abs(checkColumnToKing) === Math.abs(checkRowToKing);
    }

    const isValidFromStepKing = isKing && cellColor === 'black';
    const isValidToStepKing = activeCellId.isKing && cellColor === 'black' && checkStepKing;

    const isValidToEat = (row === activeCellId.fromRow + 2 || row === activeCellId.fromRow - 2) &&
      (column === activeCellId.fromColumn + 2 || column === activeCellId.fromColumn - 2);

    const checkForTransferToKing = activeCellId.checkerColor === 'white'
      ? !isKing && [63, 61, 59, 57].some(item => item === id)
      : !isKing && [2, 4, 6, 8].some(item => item === id);

    if (isValidFromStepKing) {
      setActiveCellId({
        ...activeCellId,
        fromId: id,
        fromRow: row,
        fromColumn: column,
        fromColor: checkerColor,
        isKing,
        checkerColor,
      });
    } else if (isValidToStepKing) {
      setActiveCellId({ ...activeCellId, toId: id, isKing: activeCellId.isKing});
    } else if (isValidFrom) { //if valid, then set info about checkerColor which a make move
      setActiveCellId({
        ...activeCellId,
        fromId: id,
        fromRow: row,
        fromColumn: column,
        fromColor: checkerColor,
        isKing,
        checkerColor,
      });
    } else if (isValidToStep) { //is valid, then get info and set about cell where do I want put checkerColor
        setActiveCellId({ ...activeCellId, toId: id, isKing: checkForTransferToKing});
    } else if (isValidToEat) { //is valid, then set checker across cell by diagonal
        const coordinateToEat = { row: null, column: null };
        const setCoordinateColumnToEat = activeCellId.fromColumn < column
          ? coordinateToEat.column = activeCellId.fromColumn + 1
          : coordinateToEat.column = activeCellId.fromColumn - 1;
        const setCoordinateRowToEat = activeCellId.fromRow < row
          ? coordinateToEat.row = activeCellId.fromRow + 1
          : coordinateToEat.row = activeCellId.fromRow - 1;
        eatChecker(setCoordinateRowToEat, setCoordinateColumnToEat, id, checkForTransferToKing);
    } else if (activeCellId.fromId !== null && activeCellId.toId === null) {
        setActiveCellId(ACTIVE_CELL_INIT);
    }
  };

  return (
    board.map((cell) => (
      <Cell
        cell={cell}
        handlerStep={handlerStep}
      />
    ))
  );
}

export default Board;
