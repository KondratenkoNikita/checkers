import React, { useRef } from 'react';
import cn from 'classnames';
import './App.css';
import checkerBlack from "./images/checkerBlack.png";
import checkerBlackKing from "./images/checkerBlackKing.png";
import checkerRed from "./images/checherRed.png";
import checkerRedKing from "./images/checkerRedKing.png";

function Cell({
  cell = {},
  handlerStep,
}) {
  const { id, cellColor, checkerColor, row, column, isKing } = cell;
  const ref = useRef({ id });
  let img = '';

  if (checkerColor === 'white' && !isKing) img = checkerRed;
  if (checkerColor === 'white' && isKing) img = checkerRedKing;
  if (checkerColor === 'black' && !isKing) img = checkerBlack;
  if (checkerColor === 'black' && isKing) img = checkerBlackKing;

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
      <img className="checkerSize" src={img} />
    </button>
  );
}

export default Cell;
