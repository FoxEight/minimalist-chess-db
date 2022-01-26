const express = require('express');
const app = express();
const path = require('path');
const { Pool, Client } = require('pg');

const PORT = 3000;

// const PG_URI =
//   'postgres://mvdripev:rt1LuFe_5KYSBHe6pk1-ODLBWm9fg8aA@kashin.db.elephantsql.com/mvdripev';

// const pool = new Pool({
//   connectionString: PG_URI,
// });

const db = require('../db');

const queryController = require('../controllers/queryController.js');

// app.use(express.static(path.resolve(__dirname, './client/src')));

// app.get('/', (req, res) => {
//   console.log('here');
//   res.status(200).sendFile(path.resolve(__dirname, '../client/src/index.html'));
// });

app.get('/query', queryController.getGames, (req, res) => {
  console.log('in final middleware');
  console.log(res.locals.gameData);
  return res.status(200).set('Access-Control-Allow-Origin', '*').json(res.locals.gameData);
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
