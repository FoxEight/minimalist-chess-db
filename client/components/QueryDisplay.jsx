import React, { Component } from 'react';
import GameQuery from './GameQuery.jsx';

class QueryDisplay extends Component {
  constructor(props) {
    super();
  }

  render() {
    console.log('gameData in Query Display', this.props.gameData);

    let queryArr;

    if (this.props.gameData.length)
      queryArr = this.props.gameData.map(gameObj => {
        console.log(gameObj);
        return <GameQuery gameData={gameObj} />;
      });

    return (
      <div>
        <h2>I'm the Query Display!</h2>
        <div className="the-query-display">
          <ul>
            <li>{this.props.gameData.length ? this.props.gameData[0].date : 'No Data'}</li>
          </ul>
          {/* <GameQuery gameData={this.props.gameData} /> */}
          {queryArr}
        </div>
      </div>
    );
  }
}

export default QueryDisplay;
