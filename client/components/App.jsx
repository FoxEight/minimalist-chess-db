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
    };
    this.displayGame = this.displayGame.bind(this);
    this.handleCreateClick = this.handleCreateClick.bind(this);
    this.handleCreateAccountClick = this.handleCreateAccountClick.bind(this);
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

  handleCreateAccountClick = function (event) {
    // event.preventDefault();
    // console.log('form submit');
    // console.log(event.target);
    // const bodyToSend = JSON.stringify({
    //   username: document.getElementById('username').value,
    //   password: document.getElementById('password').value,
    // });
    // console.log(bodyToSend);
    // const options = {
    //   method: 'POST',
    //   header: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //   },
    //   // mode: 'no-cors',
    //   body: bodyToSend,
    // };
    // fetch(
    //   'http://localhost:3000/createaccount',
    //   options
    //   // {
    //   // method: 'POST',
    //   // header: {
    //   //   'Content-Type': 'application/json',
    //   //   'Access-Control-Allow-Origin': '*',
    //   // },
    //   // // mode: 'cors',
    //   // body: JSON.stringify({
    //   //   username: document.getElementById('username').value,
    //   //   password: document.getElementById('password').value,
    //   // }),
    //   // }
    // ).then(res => console.log(res));
  };

  render() {
    console.log('rendering');
    if (this.state.needsAccount) {
      return <CreateAccount handleCreateAccountClick={this.handleCreateAccountClick} />;
    }

    if (!this.state.token) {
      return <Login handleCreateClick={this.handleCreateClick} />;
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
