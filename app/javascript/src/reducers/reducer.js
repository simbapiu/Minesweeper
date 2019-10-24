import board from './boardReducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
  board
});

export default reducers;