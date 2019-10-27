import React, { Component } from 'react';
import Menu from './Menu';
import boardReducer from '../reducers/boardReducer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Routes from './Routes';
import { HashRouter as Router } from 'react-router-dom';
import { NEW_GAME } from '../constants/actionTypes';

const store = createStore(
  boardReducer,
  applyMiddleware(thunk)
);

const initAction = {
  type: NEW_GAME,
  size: 10
};

store.dispatch(initAction);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Router >
            <Menu />
            <div className="container">
              <Routes />
            </div>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;