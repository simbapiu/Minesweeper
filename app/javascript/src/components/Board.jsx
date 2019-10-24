import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Cell from '../containers/Cell';
import { connect } from 'react-redux';
import { lose, win } from '../reducers/reducerFunctions';
import { NEW_GAME } from '../constants/actionTypes';

class Board extends Component {
  constructor(props) {
    super(props);
    this.handleRestart = this.handleRestart.bind(this);
  }

  handleRestart(e) {
    e.preventDefault();
    console.log(localStorage);
    localStorage.clear();
    console.log(localStorage);
    this.props.restartGame();
  }

  render() {
    return (
      <div className="jumbotron">
        <div className="restart-game">
          <button onClick={this.handleRestart}>Restart-Game</button>
        </div>
        <table className="game-table">
          <tbody>
            {this.props.table.map((cells, row) => (
              <tr key={`mine-row-${row}`} className="game-rows">
                {cells.map((cell) => (
                  <Cell key={`mine-cell-${cell.id}`} {...cell} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Board.propTypes = {
  table: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired
};

function mapStateToProps({board}) {
  if(win(board)) {
    alert("You Win");
  }
  else if (lose(board)) {
    alert("You Lose");
    Object.values(board).filter((cell) => cell.isOpen = true);
  }
  else {
    return board;
  }
}

function mapDispatchToProps(dispatch){
  return {
    //saveGame: (board) => dispatch(saveGame(board)),
    restartGame: () => dispatch({type: NEW_GAME, size: 10})
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
