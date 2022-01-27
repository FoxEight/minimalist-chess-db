import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Board from './Board.jsx';
import QueryContainer from '../containers/QueryContainer.jsx';
import Login from './Login.jsx';
import CreateAccount from './CreateAccount.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      embedUrl: false,
      token: false,
      needsAccount: false,
      isLoggedIn: false,
      logInAttemptMsg: false,
    };
    this.displayGame = this.displayGame.bind(this);
    this.handleCreateClick = this.handleCreateClick.bind(this);
    // this.handleCreateAccountClick = this.handleCreateAccountClick.bind(this);
    this.addedNewUser = this.addedNewUser.bind(this);
    this.handleLogInAttempt = this.handleLogInAttempt.bind(this);
  }

  displayGame(fen) {
    const embedUrl = 'https://fritz.chessbase.com?fen=' + fen;
    console.log(embedUrl);
    console.log(fen);
    this.setState({ embedUrl });
  }

  handleCreateClick() {
    console.log('create click');
    this.setState(prevState => {
      console.log(prevState);
      const newState = {
        ...prevState,
        needsAccount: true,
      };
      console.log(newState);
      return newState;
    });
  }

  addedNewUser = function () {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        needsAccount: false,
      };
      console.log(newState);
      return newState;
    });
  };

  handleLogInAttempt = function (msg) {
    if (msg === 'Success!') {
      console.log('Success state change');
      this.setState(prevState => {
        const newState = {
          ...prevState,
          isLoggedIn: true,
        };
        console.log(newState);
        return newState;
      });
    } else {
      console.log('Invalid user/pass state change');
      this.setState(prevState => {
        const newState = {
          ...prevState,
          logInAttemptMsg: msg,
        };
        console.log(newState);
        return newState;
      });
    }
  };

  render() {
    console.log('rendering');
    if (this.state.needsAccount) {
      return <CreateAccount addedNewUser={this.addedNewUser} />;
    }

    if (!this.state.isLoggedIn) {
      return (
        <Login
          handleCreateClick={this.handleCreateClick}
          handleLogInAttempt={this.handleLogInAttempt}
          logInAttemptMsg={this.state.logInAttemptMsg}
        />
      );
    }

    if (this.state.isLoggedIn)
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
