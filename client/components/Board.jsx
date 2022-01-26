import React, { Component } from 'react';

class Board extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="board">
        <h1>THE BOARD</h1>
        {/* <iframe
          className="board-embed-frame"
          src="https://fritz.chessbase.com?fen=r1brnbk1/1p1n1ppp/p2p4/q1pPpPPP/4P1Q1/2N1BN2/PPP1B3/1K4RR w - - 0 1"
        ></iframe> */}
      <div className='board-embed-frame'></div>
      </div>
    );
  }
}

export default Board;
