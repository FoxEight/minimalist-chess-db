import React, { Component } from 'react';

class Board extends Component {
  constructor() {
    super();
  }

  render() {
    console.log(this.props.embedUrl);
    return (
      <div className="board-embed-container">
        <iframe className="board-embed-frame" src={this.props.embedUrl}></iframe>
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
