const db = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userController = {};

userController.encryptPW = (req, res, next) => {
  console.log('encryptPW middleware');
  console.log(req.query);
  const { password: pw } = req.query;
  console.log(pw);

  const hashedPW = bcrypt.hash(pw, saltRounds, (err, hash) => {
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

  console.log(params);

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

userController.verifyUser = (req, res, next) => {
  console.log('in verify user middleware');
  console.log(req.query);
  res.locals.verified = true;
  return next();
};

userController.login = (req, res, next) => {
  console.log('in login middleware');
  // console.log(req.query);
  return next();
};

module.exports = userController;
