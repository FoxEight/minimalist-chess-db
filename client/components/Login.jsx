import React from 'react';

export default function Login(props) {
  return (
    <div>
      <h2>This is the Login Page</h2>
      <form>
        <label>username --> </label>
        <input></input>
        <label>password --> </label>
        <input></input>
        <button>Login</button>
      </form>
      <br></br>
      <button onClick={props.handleCreateClick}>Create Account</button>
    </div>
  );
}
