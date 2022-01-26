// import { query_timeout } from 'pg/lib/defaults';
import React, { Component } from 'react';
import GameQuery from './GameQuery.jsx';

class QueryDisplay extends Component {
  constructor(props) {
    super();
  }

  render() {
    console.log('gameData in Query Display', this.props.gameData);

    let queryArr;

    if (this.props.gameData.length) {
      queryArr = this.props.gameData.map(gameObj => {
        console.log(gameObj);
        return (
          <li>
            <GameQuery gameData={gameObj} displayGame={this.props.displayGame} />
          </li>
        );
      });
      // queryArr.push(<li>List Test</li>);
    }

    return (
      <div>
        <h2>I'm the Query Display!</h2>
        <div className="the-query-display">
          <ul>{queryArr}</ul>
          {/* <GameQuery gameData={this.props.gameData} /> */}
        </div>
      </div>
    );
  }
}

export default QueryDisplay;
