import * as types from '../constants/actionTypes';
import defaultStore from './defaultStore';
import * as reducerFunction from './reducerFunctions';

function setMines(size) {
  const mineLocationArray = [];
  while (mineLocationArray.length < size) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);
    const coordinate = `${x}, ${y}`;
    if (!mineLocationArray.includes(coordinate)) {
      mineLocationArray.push(coordinate);
    }
  }
  localStorage.setItem('mineLocations', JSON.stringify(mineLocationArray));
  return mineLocationArray;
}

function getCurrentGame(size) {
  const boardRecovered = localStorage.getItem('currentGame');
  if (boardRecovered !== null) {
    return JSON.parse(boardRecovered);
  }
  else {
    return reducerFunction.emptyBoard(size);
  }
}

function getCurrentMineLocations(size) {
  const mineLocationRecovered = localStorage.getItem('mineLocations');
  if (mineLocationRecovered !== null) {
    return JSON.parse(mineLocationRecovered);
  }
  else {
    return setMines(size);
  }
}

function boardReducer(state = defaultStore, action = { type: "" }) {
  switch(action.type){
    case types.NEW_GAME:
      const board = getCurrentGame(action.size);
      const mineLocations = getCurrentMineLocations(action.size);
      mineLocations.forEach((coordinate) => {
        board[coordinate].hasMine = true;
      });

      reducerFunction.forBoardSize(action.size, (coordinate) => {
        if (!board[coordinate].hasMine) {
          board[coordinate].count = 0;
          reducerFunction.surroundCells(coordinate, (mineSelected) => {
            if (board[mineSelected] && board[mineSelected].hasMine) {
              board[coordinate].count += 1;
            }
          });
        }
      });

      return {
        ...state, board
      };

    case types.OPEN_CELL: {
      const board = reducerFunction.open(state.board, action.id);

      return {
        ...state, board
      };
    }

    case types.CELL_FLAG: {
      const board = reducerFunction.placedFlag(state.board, action.id);
      return {
        ...state, board
      };
    }

    default:
      return state;
  }
}

export { boardReducer as default};
