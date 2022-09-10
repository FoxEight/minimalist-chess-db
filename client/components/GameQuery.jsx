import React, { Component } from 'react';

class GameQuery extends Component {
  constructor(props) {
    super();
  }

  render() {
    const {
      _id,
      date,
      fen,
      termination,
      link,
      w_first_name,
      w_last_name,
      w_handle,
      w_elo,
      b_first_name,
      b_last_name,
      b_handle,
      b_elo,
    } = this.props.gameData;

    console.log('in GameQuery component', this.props.gameData);
    let resultSpanArr = [];
    if (this.props.gameData) {
      // for (const el in this.props.gameData) {
      //   if (el !== 'fen') resultSpanArr.push(<span>{this.props.gameData[el]} | </span>);
      // }
      console.log(date, w_first_name);
      resultSpanArr.push(
        <div className="query-result">
          <span>
            {w_first_name} {w_last_name}, {w_elo} (W) vs. {b_first_name} {b_last_name}, {b_elo} (B)
            - {date} - Result: {termination} -->
          </span>
          <button
            onClick={() => {
              this.props.displayGame(fen, _id);
            }}
          >
            Display Game
          </button>
        </div>
      );
    }
    //  [<span>Data</span>, <span>goes</span>, <span>here</span>];

    return <div>{resultSpanArr}</div>;
  }
}

export default GameQuery;
