import React, { useEffect, useState } from 'react';
import Cell from '../Cell/Cell';
import './board.css';

export const ACTIVE_CELL_INIT = {
  fromId: null,
  fromRow: null,
  fromColumn: null,
  fromCheckerColor: null,
  fromIsKing: false,
  toId: null,
};

function Board({board, setBoard}) {
  const [activeCell, setActiveCell] = useState(ACTIVE_CELL_INIT);
  const {
    fromId,
    fromRow,
    fromColumn,
    fromCheckerColor,
    fromIsKing,
    toId,
  } = activeCell;

  const eatChecker = (rowEat, columnEat, toId, isKing) => {
    console.log(activeCell, 'activeCell')
    let updatedBoard = [];
    const eatenChecker = board.find(({row, column}) => row === rowEat && column === columnEat);
    const isValidToEat = fromCheckerColor !== eatenChecker.checkerColor && eatenChecker.checkerColor !== null;
    if (isValidToEat) {
      updatedBoard = [ ...board.map(cell => {
        if (cell.id === eatenChecker.id) {
          return { ...cell, checkerColor: null, isKing: null };
        }
        if (cell.id === toId) {
          return { ...cell, checkerColor: fromCheckerColor, isKing };
        }
        if (cell.id === activeCell.fromId) {
          return { ...cell, checkerColor: null, isKing: null };
        }
        return cell
      })];
      setBoard(updatedBoard);
    }
  }

  const updateBoard = () => {
    const updatedBoard = [ ...board.map(cell => {
      if (cell.id === fromId) {
       return { ...cell, checkerColor: null, isKing: null };
      }
      if (cell.id === toId) {
        return { ...cell, checkerColor: fromCheckerColor, isKing: fromIsKing };
      }
      return cell
    })];
    setBoard(updatedBoard);
  };

  useEffect(() => {
    if (toId !== null) updateBoard();
  }, [activeCell]);

  useEffect(() => {
    setActiveCell(ACTIVE_CELL_INIT);
  }, [board]);

  const handlerStep = (currentCellId, currentCheckerColor, currentCellColor, currentRow, currentColumn, currentIsKing) => {
    const correctRow = fromCheckerColor === 'white'
      ? currentRow === fromRow + 1
      : currentRow === fromRow - 1;

    const checkColumn = currentColumn === fromColumn + 1 || currentColumn === fromColumn - 1;

    const isValidFrom = currentCheckerColor !== null && currentCellColor === 'black' && fromId === null;

    const isValidToStep = !currentIsKing && currentCellColor === 'black' && currentCheckerColor === null && correctRow && checkColumn;
    let checkStepKing = null;
    let jumpedCheckers = {quantity: 0, id: 0, row: 0, column: 0};
    const jumpedCheckersCoordinates = [];

    if (fromIsKing) {
      const checkColumnToKing = currentColumn - fromColumn;
      const checkRowToKing = currentRow - fromRow;
      let startColumn = currentColumn < fromColumn ? currentColumn : fromColumn;
      let endColumn = currentColumn > fromColumn ? currentColumn : fromColumn;
      let startRow = currentRow < fromRow ? currentRow : fromRow;
      let endRow = currentRow > fromRow ? currentRow : fromRow;
      let rowRevers = currentRow < fromRow ? fromRow : currentRow;
      let columnRevers = currentColumn < fromColumn ? fromColumn : currentColumn;
      let index = 0;

      for (let i = startRow + 1; i <= endRow - 1; i++ ) {
        const x = fromColumn < currentColumn ? rowRevers -= 1 : i;
        jumpedCheckersCoordinates.push({x});
      }
      for (let i = startColumn + 1; i <= endColumn - 1; i++ ) {
        const y = fromRow < currentRow ? columnRevers -= 1 : i;
        if (jumpedCheckersCoordinates.length) jumpedCheckersCoordinates[index].y = y;
        index++;
      }
      board.map(cell => {
        jumpedCheckersCoordinates.forEach(({ x, y }) => {
          if (cell.row === x && cell.column === y ) {
            if (cell.checkerColor !== null) {
              jumpedCheckers.quantity += 1;
              jumpedCheckers.row = cell.row;
              jumpedCheckers.column = cell.column;
              jumpedCheckers.id = cell.id;
            };
            if (cell.checkerColor === fromCheckerColor) jumpedCheckers.quantity += 100;
          }
        })
      });

      if (jumpedCheckers.quantity === 1) eatChecker(jumpedCheckers.row, jumpedCheckers.column, currentCellId, true);
      checkStepKing = (Math.abs(checkColumnToKing) === Math.abs(checkRowToKing)) && (jumpedCheckers.quantity < 2);
    }

    const isValidFromStepKing = currentIsKing && currentCellColor === 'black';
    const isValidToStepKing = fromIsKing && currentCellColor === 'black' && checkStepKing && currentCheckerColor === null;
    const isValidToEat = !currentIsKing &&
      (currentRow === fromRow + 2 || currentRow === fromRow - 2) &&
      (currentColumn === fromColumn + 2 || currentColumn === fromColumn - 2);

    const checkForTransferToKing = fromCheckerColor === 'white'
      ? !currentIsKing && [63, 61, 59, 57].some(item => item === currentCellId)
      : !currentIsKing && [2, 4, 6, 8].some(item => item === currentCellId);

    if (isValidFromStepKing) {
      setActiveCell({
        ...activeCell,
        fromId: currentCellId,
        fromRow: currentRow,
        fromColumn: currentColumn,
        fromCheckerColor: currentCheckerColor,
        fromIsKing: currentIsKing,
      });
    } else if (isValidToStepKing) {
      setActiveCell({ ...activeCell, toId: currentCellId});
    } else if (isValidFrom) { //if valid, then set info about checkerColor which a make move
      setActiveCell({
        ...activeCell,
        fromId: currentCellId,
        fromRow: currentRow,
        fromColumn: currentColumn,
        fromCheckerColor: currentCheckerColor,
        fromIsKing: currentIsKing,
      });
    } else if (isValidToStep) { //is valid, then get info and set about cell where do I want put checkerColor
        setActiveCell({ ...activeCell, toId: currentCellId, fromIsKing: checkForTransferToKing});
    } else if (isValidToEat) { //is valid, then set checker across cell by diagonal
        const coordinateToEat = { row: null, column: null };
        const setCoordinateColumnToEat = activeCell.fromColumn < currentColumn
          ? coordinateToEat.column = activeCell.fromColumn + 1
          : coordinateToEat.column = activeCell.fromColumn - 1;
        const setCoordinateRowToEat = activeCell.fromRow < currentRow
          ? coordinateToEat.row = activeCell.fromRow + 1
          : coordinateToEat.row = activeCell.fromRow - 1;
        eatChecker(setCoordinateRowToEat, setCoordinateColumnToEat, currentCellId, checkForTransferToKing);
    } else if (activeCell.fromId !== null && activeCell.toId === null) {
        setActiveCell(ACTIVE_CELL_INIT);
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
