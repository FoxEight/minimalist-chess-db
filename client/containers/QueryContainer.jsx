import React, { Component } from 'react';
import QueryDisplay from '../components/QueryDisplay.jsx';
import QueryOptions from '../components/QueryOptions.jsx';

class QueryContainer extends Component {
  constructor(props) {
    super();
    this.handleQueryClick = this.handleQueryClick.bind(this);
    this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.state = {
      games: [],
      playerQuery: '',
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
          prevState.games = data;
          return prevState;
        });
      })
      .catch(err => console.log('ERROR FRONT END', err));
  }

  handleSearchBarChange(e) {
    console.log(e.target.value);
    // const playerQuery = e.target.value;
    // console.log(playerQuery);
    this.setState(prevState => {
      return {
        ...prevState,
        playerQuery: e.target.value,
      };
    });
  }

  handleSearchSubmit(event) {
    event.preventDefault();
    const [firstName, lastName] = this.state.playerQuery.split(' ');
    const url = `http://localhost:3000/query/byplayer/?firstName=${firstName}&lastName=${lastName}`;

    const options = {
      header: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };

    fetch(url, options)
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(data => {
        console.log(data);
        this.setState(prevState => {
          return {
            ...prevState,
            games: data,
            playerQuery: '',
          };
        });
      });
    // .finally(() => {
    //   this.setState(prevState => {
    //     return {
    //       ...prevState,
    //       playerQuery: '',
    //     };
    //   });
    // });
  }

  render() {
    console.log('rendering');
    return (
      <div className="parent-query-container">
        <QueryOptions
          handleSearchBarChange={this.handleSearchBarChange}
          handleQueryClick={this.handleQueryClick}
          handleSearchSubmit={this.handleSearchSubmit}
          playerQuery={this.state.playerQuery}
        />
        <QueryDisplay gameData={this.state.games} displayGame={this.props.displayGame} />
      </div>
    );
  }
}

export default QueryContainer;
