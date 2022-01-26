import React, { Component } from 'react';
import QueryDisplay from '../components/QueryDisplay.jsx';

class QueryContainer extends Component {
  constructor(props) {
    super();
    this.handleQueryClick = this.handleQueryClick.bind(this);
    this.state = {
      games: [],
    };
  }

  handleQueryClick() {
    fetch('http://localhost:3000/query', {
      header: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then(res => {
        console.log('back at front end');
        return res.json();
      })
      .then(data => {
        console.log('after parse');
        console.log(data);
        this.setState(prevState => {
          prevState.games = [data];
          return prevState;
        });
      })
      .catch(err => console.log('ERROR FRONT END', err));
  }

  render() {
    console.log('rendering');
    return (
      <div className="parent-query-container">
        <button onClick={this.handleQueryClick}>Query DB</button>
        <QueryDisplay gameData={this.state.games} />
      </div>
    );
  }
}

export default QueryContainer;
