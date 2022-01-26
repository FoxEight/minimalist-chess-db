import React, { Component } from 'react';
import Board from './Board.jsx';
import QueryContainer from '../containers/QueryContainer.jsx';

class App extends Component {
  // constructor() {
  //   super();
  // }

  render() {
    return (
      <div className="center-container">
        <h1>Some Shit About Chess</h1>
        <Board />
        <QueryContainer />
      </div>
    );
  }
}

export default App;
