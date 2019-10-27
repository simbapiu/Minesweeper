import React, { Component } from 'react';
import Home from './Home';
import Board from '../containers/Board';
import {Route, Switch} from 'react-router-dom'

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/new" component={Home} />
        <Route exact path="/games" component={Board} />
      </Switch>
    );
  }
}

export default Routes;