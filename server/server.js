const express = require('express');
const app = express();
const path = require('path');
// const { Pool, Client } = require('pg');
const bodyParser = require('body-parser');

const PORT = 3000;

// const PG_URI =
//   'postgres://mvdripev:rt1LuFe_5KYSBHe6pk1-ODLBWm9fg8aA@kashin.db.elephantsql.com/mvdripev';

// const pool = new Pool({
//   connectionString: PG_URI,
// });

const db = require('../db');

const queryController = require('../controllers/queryController.js');
const userController = require('../controllers/userController.js');
const cookieController = require('../controllers/cookieController.js');
const sessionController = require('../controllers/sessionController');

// console.log(userController);

// app.use(express.static(path.resolve(__dirname, './client/src')));

// app.get('/', (req, res) => {
//   console.log('here');
//   res.status(200).sendFile(path.resolve(__dirname, '../client/src/index.html'));
// });

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/query', queryController.getGames, (req, res) => {
  console.log('in final query middleware');
  // console.log(res.locals.gameData);
  return res.status(200).set('Access-Control-Allow-Origin', '*').json(res.locals.gameData);
});

app.post(
  '/createaccount*',
  userController.encryptPW,
  userController.createAccount,
  cookieController.setCookie,
  sessionController.startSession,
  cookieController.setSSIDCookie,
  (req, res) => {
    // console.log('req body in server', req.body);
    console.log('in final createaccount middleware');
    // req.body = { this: 'is a test' };
    // console.log(req.body);
    res.status(200).set('Access-Control-Allow-Origin', '*').json(res.locals.insertedUser);
  }
);

app.post('/login', userController.verifyUser, userController.login, (req, res) => {
  console.log('in final login middleware');
  // let message;
  // res.locals.verified ? (message = 'Success!') : (message = 'Invalid username or password');
  let message = 'testerrrr';
  res.status(200).set('Access-Control-Allow-Origin', '*').json(message);
  // res.set('crossOrigin', true);
  // console.log(res.headers);
  // res.send(message);
});

app.use((req, res) => {
  console.log('404 error route');
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  const errorObj = {
    log: 'An error occured',
    status: 300,
    message: 'Global error handler',
  };
  const newError = {
    ...errorObj,
    log,
    message,
  };
  res.status(300).json(errorObj);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
