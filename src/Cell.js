import React, { useRef } from 'react';
import cn from 'classnames';
import './App.css';

function Cell({
  cell = {},
  handlerStep,
}) {
  const { id, cellColor, checkerColor, row, column, isKing } = cell;
  const ref = useRef({ id })

  return (
    <button
      id={id}
      ref={ref}
      key={id}
      className={cn(
        'cell',
        { 'cellWhite': cellColor === 'white' },
        { 'cellBlack': cellColor === 'black' },
      )}
      onClick={() => handlerStep(id, checkerColor, cellColor, row, column, isKing)}
    >
      <span className={cn(
        'checker',
        { 'checkerWhite': checkerColor === 'white' },
        { 'checkerBlack': checkerColor === 'black' },
        { 'king': isKing },
      )} />
    </button>
  );
}

export default Cell;
