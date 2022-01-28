// const { query } = require('express');
const { ParameterStatusMessage } = require('pg-protocol/dist/messages');
const db = require('../db');

const queryController = {};

queryController.getGames = async (req, res, next) => {
  console.log('GETTING ALL GAMES');

  try {
    const queryText =
      'SELECT g._id, g.date, g.fen, g.termination, g.link, g.black, p.first_name as w_first_name, p.first_name as w_first_name, p.last_name as w_last_name, p.handle as w_handle, p.elo as w_elo from games g LEFT JOIN players p ON g.white = p._id;';

    let whiteRes = await db.query(queryText);

    console.log(whiteRes);

    whiteRes = whiteRes.rows;

    res.locals.gameData = [];

    for (const game of whiteRes) {
      const blackId = game.black;
      delete game.black;
      const params = [blackId];
      const blackQuery =
        'SELECT p.first_name as b_first_name, p.first_name as b_first_name, p.last_name as b_last_name, p.handle as b_handle, p.elo as b_elo FROM players p WHERE p._id = $1;';

      let blackRes = await db.query(blackQuery, params);

      for (const item in blackRes.rows[0]) {
        game[item] = blackRes.rows[0][item];
        // res.locals.gameData[item] = blackRes.rows[0][item];
      }
      console.log('GAME', game);
      res.locals.gameData.push(game);
    }
    console.log(res.locals.gameData);
    return next();
  } catch (err) {
    return next({
      log: 'Error in queryController.getGames. Error: ' + err,
      message: { err: 'Error in queryController.getGames. See log for more deets' },
    });
  }
};

queryController.addFavorite = async (req, res, next) => {
  console.log('in add fav');

  try {
    console.log(req.query);
    // console.log(req.cookies);
    // console.log('ssid', req.cookies.ssid);
    // const params1 = [req.query.curUserId];
    // const queryText1 = 'SELECT _id FROM users WHERE _id = $1;';
    // const userId = await db.query(queryText1, params1);

    // console.log(userId);

    const params2 = [req.query.curUserId, req.query.gameId];
    const queryText2 = 'INSERT INTO favorited_games VALUES (DEFAULT, $1, $2);';

    db.query(queryText2, params2);
    const result = await db.query('SELECT * FROM favorited_games;');
    console.log(result);

    return next();
  } catch (err) {
    return next({
      log: 'Error in queryController.addFavorite. Error: ' + err,
      message: { err: 'Error in queryController.addFavorite. See log for more deets' },
    });
  }
};

queryController.getGamesByPlayer = async (req, res, next) => {
  console.log('in get games by player');
  console.log(req.query);

  try {
    const { firstName, lastName } = req.query;

    const params = [firstName, lastName];
    console.log(params);

    const getPlayerId = 'SELECT _id FROM players WHERE first_name = $1 AND last_name = $2;';

    const playerId = await db.query(getPlayerId, params);
    console.log(playerId);

    const params2 = [Number(playerId.rows[0]._id)];
    console.log(params2);
    console.log(typeof params2[0]);

    // const queryText =
    //   'SELECT g._id, g.date, g.fen, g.termination, g.link, g.black, p.first_name as w_first_name, p.first_name as w_first_name, p.last_name as w_last_name, p.handle as w_handle, p.elo as w_elo from games g LEFT OUTER JOIN players p ON g.white = $1;';

    const queryText =
      'SELECT g._id, g.date, g.fen, g.termination, g.link, g.black, g.white from games g WHERE g.white = $1;';

    let gameRes = await db.query(queryText, params2);

    console.log('GAME RES', gameRes.rows);

    gameRes = gameRes.rows;

    res.locals.gameData = [];

    for (const game of gameRes) {
      const blackId = game.black;
      delete game.black;
      const params = [blackId];
      const blackQuery =
        'SELECT p.first_name as b_first_name, p.first_name as b_first_name, p.last_name as b_last_name, p.handle as b_handle, p.elo as b_elo FROM players p WHERE p._id = $1;';

      let blackRes = await db.query(blackQuery, params);

      console.log(blackRes);

      for (const item in blackRes.rows[0]) {
        game[item] = blackRes.rows[0][item];
        // res.locals.gameData[item] = blackRes.rows[0][item];
      }
      console.log('GAME', game);

      // White
      const whiteId = game.white;
      delete game.white;
      const params3 = [whiteId];
      const whiteQuery =
        'SELECT p.first_name as w_first_name, p.first_name as w_first_name, p.last_name as w_last_name, p.handle as w_handle, p.elo as w_elo FROM players p WHERE p._id = $1;';

      let whiteRes = await db.query(whiteQuery, params3);

      for (const item in whiteRes.rows[0]) {
        game[item] = whiteRes.rows[0][item];
        // res.locals.gameData[item] = blackRes.rows[0][item];
      }
      console.log('GAME', game);

      res.locals.gameData.push(game);
    }
    console.log(res.locals.gameData);
    return next();
  } catch (err) {
    return next({
      log: 'Error in queryController.getGames. Error: ' + err,
      message: { err: 'Error in queryController.getGames. See log for more deets' },
    });
  }
};

queryController.getFavorites = async (req, res, next) => {
  // console.log('GETTING FAVORITE GAMES');
  // try {
  //   const queryText =
  //     'SELECT g.date, g.fen, g.termination, g.link, g.black, p.first_name as w_first_name, p.first_name as w_first_name, p.last_name as w_last_name, p.handle as w_handle, p.elo as w_elo from games g LEFT JOIN players p ON g.white = p._id;';
  //   let whiteRes = await db.query(queryText);
  //   console.log(whiteRes);
  //   whiteRes = whiteRes.rows;
  //   res.locals.gameData = [];
  //   for (const game of whiteRes) {
  //     const blackId = game.black;
  //     delete game.black;
  //     const params = [blackId];
  //     const blackQuery =
  //       'SELECT p.first_name as b_first_name, p.first_name as b_first_name, p.last_name as b_last_name, p.handle as b_handle, p.elo as b_elo FROM players p WHERE p._id = $1;';
  //     let blackRes = await db.query(blackQuery, params);
  //     for (const item in blackRes.rows[0]) {
  //       game[item] = blackRes.rows[0][item];
  //       // res.locals.gameData[item] = blackRes.rows[0][item];
  //     }
  //     console.log('GAME', game);
  //     res.locals.gameData.push(game);
  //   }
  //   console.log(res.locals.gameData);
  //   return next();
  // } catch (err) {
  //   return next({
  //     log: 'Error in queryController.getGames. Error: ' + err,
  //     message: { err: 'Error in queryController.getGames. See log for more deets' },
  //   });
  // }
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
