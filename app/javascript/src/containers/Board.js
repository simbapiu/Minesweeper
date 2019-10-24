import Board from '../components/Board';
import { connect } from 'react-redux';
import { forBoardSize } from '../reducers/reducerFunctions';

function mapStateToProps({ board }){
  const boardDimension = Math.sqrt(Object.keys(board).length);
  const table = [];
  forBoardSize(boardDimension, (coordinate, row, col) => {
    if (!table[row]) {
      table[row] = [];
    }
    table[row][col] = board[coordinate];
  });

  return {
    table
  }
}

export default connect(mapStateToProps)(Board);