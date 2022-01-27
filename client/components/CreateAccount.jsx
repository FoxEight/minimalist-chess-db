import React, { useState } from 'react';

export default function (props) {
  console.log(props.handleCreateAccountClick);

  const [username, setUsername] = useState('');
  const [password, setpassword] = useState('');

  function handleUserNameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setpassword(e.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log('form submit');
    console.log(username, password);
    const bodyToSend = JSON.stringify({
      username,
      password,
    });
    console.log(bodyToSend);
    const options = {
      method: 'POST',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      // mode: 'no-cors',
      body: bodyToSend,
    };

    fetch('http://localhost:3000/createaccount', options).then(res => console.log(res));
  }

  return (
    <div>
      <h2>This is the Create Account Page</h2>
      <form id="form-create-account" onSubmit={handleSubmit}>
        <label for="username">
          Username ---
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUserNameChange}
          />
        </label>
        <label for="password">
          Password ---
          <input
            type="text"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <input type="submit" value="Create Account" />
      </form>
    </div>
  );
}
