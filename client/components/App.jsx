import React, { Component } from 'react';
import Board from './Board.jsx';
import QueryContainer from '../containers/QueryContainer.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {};
    this.displayGame = this.displayGame.bind(this);
  }

  displayGame(fen) {
    console.log(fen);
    this.setState({ fen });
  }

  render() {
    return (
      <div className="center-container">
        <h1>Some Shit About Chess</h1>
        <Board fen={this.state.fen} />
        <QueryContainer displayGame={this.displayGame} />
      </div>
    );
  }
}

export default App;
