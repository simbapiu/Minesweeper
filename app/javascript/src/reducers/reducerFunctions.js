import { defaultCell } from "./defaultStore";
import {INIT_BOARD} from '../constants/actionTypes';
import store from './defaultStore';

export function forBoardSize(size, callback) {
  for (let row=0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const coordinate = `${row}, ${col}`;
      callback(coordinate, row, col);
    }
  }
}

export function surroundCells(coordinate, callback) {
  const coordArray = coordinate.split(',');
  const row = Number(coordArray[0]);
  const col = Number(coordArray[1]);
  for (let x = row - 1; x <= row + 1; x++) {
    for (let y = col - 1; y <= col + 1; y++) {
      if (x >= 0 || y >= 0) {
        const coordinate = `${x}, ${y}`;
        callback(coordinate, x, y);
      }
    }
  }
}

export function emptyBoard(size) {
  const board = {};
  forBoardSize(size, (coordinate) => {
    board[coordinate] = {...defaultCell, id: coordinate };
  });
  return board;
}

export function open(board, id) {
  if (board[id].isOpen) {
    return board;
  }

  const cell = {...board[id], isOpen: true};
  const newBoard = {...board, [id]:cell };
  if (cell.count === 0 && !cell.hasMine) {
    return openBlankCells(newBoard, id)
  }

  localStorage.setItem('currentGame', JSON.stringify(newBoard));
  return newBoard;
}

export function placedFlag(board, id) {
  if (board[id].isOpen) {
    return board;
  }

  const cell = {...board[id], hasFlag: !board[id].hasFlag};
  const newBoard = {...board, [id]: cell};

  return newBoard;
}

export function openBlankCells(board, id) {
  let newBoard = Object.assign({}, board);

  surroundCells(id, (coordinate) => {
    if (newBoard[coordinate] && !newBoard[coordinate].hasMine && !newBoard[coordinate].isOpen) {
      newBoard = open(newBoard, coordinate);
    }
  });
  return newBoard;
}

function setMines(size) {
  const mineLocationArray = [];
  for(let mine = 0; mine < size; mine++) {
    mineLocationArray.push(`${ Math.floor(Math.random() * 10)}, ${ Math.floor(Math.random() * 10)}`)
  }

  return mineLocationArray;
}

export function restartGame() {
  const size = 10;

  const initAction = {
    type: INIT_BOARD,
    size: size,
    mineLocations: setMines(size)
  };

  store.dispatch(initAction);
}

export function lose(board) {
  return Object.values(board).some((cell) => cell.hasMine && cell.isOpen);
}

export function win(board) {
  const nonOpenCount = Object.values(board).filter((cell) => !cell.isOpen).length;
  const flaggedMineCount = Object.values(board).filter((cell) => cell.hasMine && cell.hasFlag).length;

  return nonOpenCount === flaggedMineCount
}