import React, { useEffect, useState } from 'react';
import Cell from './Cell';
import './App.css';

export const ACTIVE_CELL_INIT = {
  fromId: null,
  fromRow: null,
  fromColumn: null,
  fromColor: null,
  toId: null,
  isKind: false,
  checkerColor: null,
}

function Board({board, setBoard}) {
  const [activeCellId, setActiveCellId] = useState(ACTIVE_CELL_INIT);

  const eatChecker = (rowEat, columnEat, toId) => {
    let updatedBoard = [];
    const cellEat = board.find(({row, column}) => row === rowEat && column === columnEat);
    if (activeCellId.checkerColor !== cellEat.checkerColor && cellEat.checkerColor !== null) {
      updatedBoard = [ ...board.map(cell => {
        if (cell.id === cellEat.id) {
          return { ...cell, checkerColor: null };
        }
        if (cell.id === toId) {
          return { ...cell, checkerColor: activeCellId.fromColor };
        }
        if (cell.id === activeCellId.fromId) {
          return { ...cell, checkerColor: null };
        }
        return cell
      })];
      setBoard(updatedBoard);
    }
  }

  const updateBoard = () => {
    const updatedBoard = [ ...board.map(cell => {
      if (cell.id === activeCellId.fromId) {
        cell.checkerColor = null;
      }
      if (cell.id === activeCellId.toId) {
        cell.checkerColor = activeCellId.checkerColor;
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
    console.log(id, checkerColor, cellColor, row, column)
    const checkRow = activeCellId.checkerColor === 'white'
      ? row === activeCellId.fromRow + 1
      : row === activeCellId.fromRow - 1;
    const checkColumn = activeCellId.fromColumn + 1 || column === activeCellId.fromColumn - 1;
    const isValidFrom = checkerColor !== null && cellColor === 'black' && activeCellId.fromId === null;
    const isValidToStep = cellColor === 'black' && checkRow && checkColumn;
    const isValidToEat = (row === activeCellId.fromRow + 2 || row === activeCellId.fromRow - 2) &&
      (column === activeCellId.fromColumn + 2 || column === activeCellId.fromColumn - 2);

    if (isValidFrom) { //if valid, then set info about checkerColor which a make move
      setActiveCellId({
        ...activeCellId,
        fromId: id,
        fromRow: row,
        fromColumn: column,
        fromColor: checkerColor,
        checkerColor,
      });
    } else if (isValidToStep) { //is valid, then get info and set about cell where do I want put checkerColor
      setActiveCellId({ ...activeCellId, toId: id });
    } else if (isValidToEat) { //is valid, then set checker across cell by diagonal
      const coordinateToEat = { row: null, column: null };
      const setCoordinateColumnToEat = activeCellId.fromColumn < column
        ? coordinateToEat.column = activeCellId.fromColumn + 1
        : coordinateToEat.column = activeCellId.fromColumn - 1;
      const setCoordinateRowToEat = activeCellId.fromRow < row
        ? coordinateToEat.row = activeCellId.fromRow + 1
        : coordinateToEat.row = activeCellId.fromRow - 1;
      eatChecker(setCoordinateRowToEat, setCoordinateColumnToEat, id);
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
