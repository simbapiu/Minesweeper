import * as types from '../constants/actionTypes';
import defaultStore from './defaultStore';
import * as reducerFunction from './reducerFunctions';

function setMines() {
  const mineLocationArray = [];
  for(let mine = 0; mine < 10; mine++) {
    mineLocationArray.push(`${ Math.floor(Math.random() * 10)}, ${ Math.floor(Math.random() * 10)}`)
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

function getCurrentMineLocations() {
  const mineLocationRecovered = localStorage.getItem('mineLocations');
  if (mineLocationRecovered !== null) {
    return JSON.parse(mineLocationRecovered);
  }
  else {
    return setMines();
  }
}

function boardReducer(state = defaultStore, action = { type: "" }) {
  switch(action.type){
    case types.NEW_GAME:
      const board = getCurrentGame(action.size);
      const mineLocations = getCurrentMineLocations();
      mineLocations.forEach((coordinate) => {
        board[coordinate].hasMine = true;
      });

      reducerFunction.forBoardSize(action.size, (coordinate) => {
        if (!board[coordinate].hasMine) {
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
