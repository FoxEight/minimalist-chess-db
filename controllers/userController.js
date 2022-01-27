const db = require('../db');

const userController = {};

userController.encryptPW = (req, res, next) => {
  const { pw } = req.query.password;
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

  // res.locals.data = req.body;
};

module.exports = userController;
