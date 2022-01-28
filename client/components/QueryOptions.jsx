import React from 'react';

export default function (props) {
  return (
    <div className="query-options-container">
      <button onClick={props.handleQueryClick}>Display All</button>
      <form onSubmit={props.handleSearchSubmit} className="search-bar-form">
        <input
          type="text"
          placeholder="enter player name"
          onChange={props.handleSearchBarChange}
          // value={props.playerQuery}
        />
        <input type="submit" value="Search" />
      </form>
    </div>
  );
}
