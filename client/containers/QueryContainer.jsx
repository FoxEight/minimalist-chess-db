import React, { Component } from 'react';

class QueryContainer extends Component {
  constructor(props) {
    super();
  }

  handleQueryClick() {
    fetch('http://localhost:3000/query').then(data => console.log(data));
  }

  render() {
    return <button onClick={this.handleQueryClick}>Query DB</button>;
  }
}

export default QueryContainer;
