import React, { useState } from 'react';

export default function (props) {
  // console.log(props.handleCreateAccountClick);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  function handleUserNameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  /*
`http://localhost:3000/user/?user_name=${user_name}&password=${password}`
// res.query = {user_name: username, password: password}
  */

  function handleSubmit(event) {
    event.preventDefault();
    console.log('form submit');
    // console.log(username, password);
    // const bodyToSend = JSON.stringify({
    //   username,
    //   password,
    // });
    const url = `http://localhost:3000/createaccount/?firstName=${firstName}&lastName=${lastName}&username=${username}&password=${password}&email=${email}`;

    const options = {
      method: 'POST',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      // mode: 'no-cors',
      // body: bodyToSend,
    };

    fetch(url, options)
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(data => {
        console.log(data);
        props.addedNewUser();
      })
      .catch(err => console.log(err));

    // const http = new XMLHttpRequest();

    // http.open('POST', 'http://localhost:3000/createaccount');
    // http.send(bodyToSend);

    // http.onreadystatechange = function () {
    //   if (http.readyState === 4) {
    //     console.log(http.response);
    //   }
    // };
  }

  return (
    <div>
      <h2>This is the Create Account Page</h2>
      <form id="form-create-account" onSubmit={handleSubmit}>
        <label htmlFor="first-name">
          First Name ---
          <input
            type="text"
            id="first-name"
            name="first-name"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </label>
        <label htmlFor="last-name">
          Last Name ---
          <input
            type="text"
            id="last-name"
            name="last-name"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </label>
        <label htmlFor="username">
          Username ---
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUserNameChange}
          />
        </label>
        <label htmlFor="password">
          Password ---
          <input
            type="text"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <label htmlFor="email">
          Email ---
          <input type="text" id="email" name="email" value={email} onChange={handleEmailChange} />
        </label>
        <input type="submit" value="Create Account" />
      </form>
    </div>
  );
}
