const express = require('express');
const app = express();
const path = require('path');
// const { Pool, Client } = require('pg');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

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
const { query } = require('express');

// console.log(userController);

// app.use(express.static(path.resolve(__dirname, './client/src')));

// app.get('/', (req, res) => {
//   console.log('here');
//   res.status(200).sendFile(path.resolve(__dirname, '../client/src/index.html'));
// });

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
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

app.post(
  '/login',
  userController.verifyUser,
  userController.login,
  sessionController.startSession,
  cookieController.setSSIDCookie,
  (req, res) => {
    console.log('in final login middleware');
    // let message;
    res.locals.verified ? (message = 'Success!') : (message = 'Invalid username or password');
    // let message = 'testerrrr';
    res
      .status(200)
      .set(
        'Access-Control-Allow-Origin',
        '*'
        // 'Access-Control-Allow-Credentials',
        // true
        // 'Access-Control-Allow-Headers',
        // '*'
      )
      .json({ message, curUserId: res.locals.curUserId });
    // res.set('crossOrigin', true);
    // console.log(res.headers);
    // res.send(message);
  }
);

//Access-Control-Allow-Credentials value to true. Also, make sure the HTTP headers Access-Control-Allow-Origin and Access-Control-Allow-Headers are set and not with a wildcard *.

app.post('/addfav', queryController.addFavorite, (req, res) => {
  res.status(200).set('Access-Control-Allow-Origin', '*').json('added fav');
});

app.get('/query/byplayer', queryController.getGamesByPlayer, (req, res) => {
  console.log('final query by player middleware');
  console.log(res.locals.gameData);
  res.status(200).set('Access-Control-Allow-Origin', '*').json(res.locals.gameData);
});

app.use((req, res) => {
  console.log('404 error route');
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.log('global error handler');
  const errorObj = {
    log: 'An error occured',
    status: 300,
    message: 'Global error handler',
  };
  const newError = {
    ...errorObj,
    log: err.log,
    message: err.message,
  };

  res.status(300).set('Access-Control-Allow-Origin', '*').json(newError);
  // return newError;
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
