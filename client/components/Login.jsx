import React, { useState } from 'react';

export default function (props) {
  const [usernameLogin, setUsernameLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');

  function handleUserNameLoginChange(e) {
    setUsernameLogin(e.target.value);
  }

  function handlePasswordLoginChange(e) {
    setPasswordLogin(e.target.value);
  }

  function handleOnSubmitLogin(event) {
    event.preventDefault();
    const url = `http://localhost:3000/login/?username=${usernameLogin}&password=${passwordLogin}`;

    // const createUrl = `http://localhost:3000/createaccount/?firstName=${firstName}&lastName=${lastName}&username=${username}&password=${password}&email=${email}`;

    const options = {
      method: 'POST',
      crossOrigin: true,
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/',
      },
      // mode: 'no-cors',
    };
    console.log(options);
    fetch(url, options)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        props.handleLogInAttempt(res);
      });
  }

  return (
    <div>
      <h2>This is the Login Page</h2>
      {props.logInAttemptMsg ? <p>{props.logInAttemptMsg}</p> : <p></p>}
      <form crossOrigin="anonymous" onSubmit={handleOnSubmitLogin}>
        <label htmlFor="username-login">
          Username ---
          <input
            type="text"
            id="username-login"
            name="username-login"
            value={usernameLogin}
            onChange={handleUserNameLoginChange}
          />
        </label>
        <label htmlFor="password-login">
          Password ---
          <input
            type="text"
            id="password-login"
            name="password-login"
            value={passwordLogin}
            onChange={handlePasswordLoginChange}
          />
        </label>
        <input type="submit" value="Log in" />
      </form>
      <br></br>
      <button onClick={props.handleCreateClick}>Create Account</button>
    </div>
  );
}
