import React, { Component } from 'react';

class QueryContainer extends Component {
  constructor(props) {
    super();
  }

  handleQueryClick() {
    fetch('http://localhost:3000/query').then(res => res.json()).then(data => {
        console.log('back at front end');
        console.log(data);
      }).catch(err => {
      console.log('ERROR FRONT END')
      console.log(err)
  }
      )
  }

  render() {
    return <button onClick={this.handleQueryClick}>Query DB</button>;
  }
}

export default QueryContainer;
