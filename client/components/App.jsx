import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Board from './Board.jsx';
import QueryContainer from '../containers/QueryContainer.jsx';
import Login from './Login.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      embedUrl: false,
      token: false,
    };
    this.displayGame = this.displayGame.bind(this);
  }

  displayGame(fen) {
    const embedUrl = 'https://fritz.chessbase.com?fen=' + fen;
    console.log(embedUrl);
    console.log(fen);
    this.setState({ embedUrl });
  }

  render() {
    return (
      <div className="center-container">
        <h1>Some Shit About Chess</h1>
        <Board embedUrl={this.state.embedUrl} />
        <QueryContainer displayGame={this.displayGame} />
      </div>
    );
  }
}

export default App;
