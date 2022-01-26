const { query } = require('express');
const db = require('../db');

const queryController = {};

queryController.getGames = async (req, res, next) => {
  console.log('QUERYING');

  try {
    const queryText =
      'SELECT g.date, g.fen, g.termination, g.link, g.black, p.first_name as w_first_name, p.first_name as w_first_name, p.last_name as w_last_name, p.handle as w_handle, p.elo as w_elo from games g LEFT JOIN players p ON g.white = p._id;';

    let whiteRes = await db.query(queryText);
    whiteRes = whiteRes.rows[0];

    const blackId = whiteRes.black;
    console.log({ blackId });
    delete whiteRes.black;
    res.locals.gameData = whiteRes;

    const params = [blackId];
    console.log(params);
    const blackQuery =
      'SELECT p.first_name as b_first_name, p.first_name as b_first_name, p.last_name as b_last_name, p.handle as b_handle, p.elo as b_elo FROM players p WHERE p._id = $1;';
    console.log('white res', whiteRes);

    let blackRes = await db.query(blackQuery, [blackId]);
    console.log('black res', blackRes.rows[0]);

    for (const item in blackRes.rows[0]) {
      console.log(item, blackRes.rows[0][item]);
      res.locals.gameData[item] = blackRes.rows[0][item];
    }
    return next();
  } catch (err) {
    return next({
      log: 'Error in queryController.getGames. Error: ' + err,
      message: { err: 'Error in queryController.getGames. See log for more deets' },
    });
  }
};

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

module.exports = queryController;