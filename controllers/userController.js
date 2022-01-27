const db = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userController = {};

userController.encryptPW = (req, res, next) => {
  console.log('encryptPW middleware');
  // console.log(req.query);
  const { password: pw } = req.query;
  // console.log(pw);

  bcrypt.hash(pw, saltRounds, (err, hash) => {
    if (err)
      return next({
        log: `Error in userController.encryptPW. ERROR: ${err}`,
        message: { err: 'Error in userController.encryptPW. See log for details.' },
      });
    else {
      req.query.password = hash;
      return next();
    }
  });
};

userController.createAccount = async (req, res, next) => {
  // console.log(req);
  // console.log('request body', req.body);
  // console.log('request query', req.query);

  const params = [];

  for (const datapoint in req.query) {
    params.push(req.query[datapoint]);
  }

  // console.log(params);

  const queryText = 'INSERT INTO users VALUES(DEFAULT, $1, $2, $3, $4, $5)';

  try {
    const insertedUser = await db.query(queryText, params);

    // console.log(insertedUser);

    res.locals.insertedUser = insertedUser;

    return next();
  } catch (err) {
    return next({
      log: `Error in userController.createAccount. ERROR: ${err}`,
      message: { err: 'Error in userController.createAccount. See log for details.' },
    });
  }
};

userController.verifyUser = async (req, res, next) => {
  console.log('in verify user middleware');
  // console.log(req.query);

  const { username, password } = req.query;

  const params = [username];

  try {
    const queryText = 'SELECT password FROM users WHERE username = $1';
    const queryRes = await db.query(queryText, params);
    // console.log('after db query looking for pw');
    // console.log('query res', queryRes);
    if (!queryRes.rows.length) {
      // console.log('no results');
      throw Error('NO RESULTS');
    } else {
      // console.log('here');
      const dbPass = queryRes.rows[0].password;
      // console.log(dbPass);
      const match = await bcrypt.compare(password, dbPass);
      // console.log('after bcrypt compare');
      match ? (res.locals.verified = true) : (res.locals.verified = false);
      return next();
    }
  } catch (err) {
    // console.log('in error');
    return next({
      log: `Error in userController.verifyUser. ERROR: ${err}`,
      message: { err: 'Error in userController.verifyUser. See log for details.' },
    });
  }

  // return next();
};

userController.login = (req, res, next) => {
  console.log('in login middleware');
  // console.log(req.query);
  return next();
};

module.exports = userController;
