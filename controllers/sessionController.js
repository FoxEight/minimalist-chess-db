const db = require('../db/');

const sessionController = {};

sessionController.startSession = function (req, res, next) {
  console.log('starting session');
  const ssid = Math.floor(Math.random() * 10000000000000);

  const username = req.query.username;

  const params = [ssid, username];

  const queryText = 'UPDATE users SET ssid = $1 WHERE users.username = $2';

  db.query(queryText, params)
    .then(data => {
      // res.cookie('ssid', ssid);
      res.locals.ssid = ssid;
      console.log('session created');
      return next();
    })
    .catch(err => {
      return next({
        log: `Error in userController.createAccount. ERROR: ${err}`,
        message: { err: 'Error in userController.createAccount. See log for details.' },
      });
    });
};

module.exports = sessionController;
