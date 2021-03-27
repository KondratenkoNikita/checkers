import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import './App.css';


function Board({board}) {

  return (
    board.map(({color, isKing, id, checker}) => (
      <div
        id={id}
        key={id}
        className={cn(
          'cell',
          { 'cellWhite': color === 'white' },
          { 'cellBlack': color === 'black' },
        )}
      >
        <span className={cn(
          'checker',
          { 'checkerWhite': checker === 'white' },
          { 'checkerBlack': checker === 'black' },
        )} />
      </div>
    ))
  );
}

export default Board;
