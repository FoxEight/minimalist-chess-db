// import cookieParser from 'cookie-parser';
import React, { Component } from 'react';

class Board extends Component {
  constructor() {
    super();
    // this.fen = this.props.fen;
    this.addFavToDB = this.addFavToDB.bind(this);
  }

  addFavToDB = function () {
    const url = `http://localhost:3000/addfav/?_id=${this.props.gameId}`;

    const options = {
      method: 'POST',

      header: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      credentials: 'include',
    };

    fetch(url, options)
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(data => console.log(data));
  };

  render() {
    console.log(this.props.embedUrl);
    console.log(this.props.gameId);

    return (
      <div className="board-embed-container">
        <iframe className="board-embed-frame" src={this.props.embedUrl}></iframe>
        <button onClick={this.addFavToDB}>Favorite Game</button>
      </div>
      // <div className="board">
      // // {/* <iframe
      //   className="board-embed-frame"
      //   src="https://fritz.chessbase.com?fen=r1brnbk1/1p1n1ppp/p2p4/q1pPpPPP/4P1Q1/2N1BN2/PPP1B3/1K4RR w - - 0 1"
      // ></iframe> */}

      // </div>
    );
  }
}

export default Board;
