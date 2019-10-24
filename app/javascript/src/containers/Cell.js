import Cell from '../components/Cell';
import { connect } from 'react-redux';
import * as types from '../constants/actionTypes';

const mapStateToProps = (state, ownProps) => ownProps;

function mapDispatchToProps(dispatch) {
  return {
    onOpen: (id) => {
      dispatch({
        type: types.OPEN_CELL, id: id
      })
    },

    onFlag: (id) => {
      dispatch({
        type: types.CELL_FLAG, id: id
      })
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cell);