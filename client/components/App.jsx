import React, { Component } from 'react';
import Board from './Board.jsx';

class App extends Component {
  // constructor() {
  //   super();
  // }

  render() {
    return (
      <div className="center-container">
        <h1>Some Shit About Chess</h1>
        <Board />
      </div>
    );
  }
}

export default App;
