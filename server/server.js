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
// console.log(db);

// app.use(express.static(path.resolve(__dirname, './client/src')));

// app.get('/', (req, res) => {
//   console.log('here');
//   res.status(200).sendFile(path.resolve(__dirname, '../client/src/index.html'));
// });

app.get('/query', async (req, res) => {
  console.log('QUERYING');
  const queryText =
    'SELECT g.date, g.fen, g.termination, g.link, g.black, p.first_name as w_first_name, p.first_name as w_first_name, p.last_name as w_last_name, p.handle as w_handle, p.elo as w_elo from games g LEFT JOIN players p ON g.white = p._id;';
    try {
  let whiteRes = await db.query(queryText);
  whiteRes = whiteRes.rows[0]

    const blackId = whiteRes.black;
    console.log({blackId});
    delete whiteRes.black;
    res.locals.gameData = whiteRes
     const params = [blackId];
     console.log(params);
      const blackQuery =
        'SELECT p.first_name as b_first_name, p.first_name as b_first_name, p.last_name as b_last_name, p.handle as b_handle, p.elo as b_elo FROM players p WHERE p._id = $1;';
    console.log('white res', whiteRes);

    let blackRes = await db.query(queryText, params);
    console.log('black res', blackRes);

    for (const item in blackRes.rows[0]) {
            console.log(item, blackRes.rows[0][item]);
            res.locals.gameData[item] = blackRes.rows[0][item];
          }

          console.log(res.locals.gameData);



    } catch (err) {
      console.log('ERROR', err);
    }
  
  // , (err, queryRes) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log('Got White results!');
  //     console.log(queryRes.rows);
  //     res.locals.gameData = queryRes.rows[0];
  //     return queryRes;
  //   }
  // });


      // console.log('Locals first query', res.locals.gameData);
  //     const blackId = queryRes.rows[0].black;
  //     const params = [blackId];
  //     const blackQuery =
  //       'SELECT p.first_name as b_first_name, p.first_name as b_first_name, p.last_name as b_last_name, p.handle as b_handle, p.elo as b_elo FROM players p WHERE p._id = $1;';
  //     pool.query(blackQuery, params, (err, queryRes) => {
  //       if (err) console.log(err);
  //       else {
  //         // console.log('Locals second query', res.locals.gameData);
  //         console.log('Got Black results!');
  //         console.log(queryRes.rows);

  //         for (const item in queryRes.rows[0]) {
  //           console.log(item, queryRes.rows[0][item]);
  //           res.locals.gameData[item] = queryRes.rows[0][item];
  //         }
  //         delete res.locals.gameData.black;
  //         console.log('inside', res.locals.gameData);
  //         const dataToSend = res.locals.gameData;
  //         res.status(200).send(dataToSend);
  //       }
  //     })
  // // console.log('outside',res.locals.gameData);
  
  //   }
  // })

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
  res.status(300).json(errorObj);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
