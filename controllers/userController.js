const db = require('../db');

const userController = {};

userController.createAccount = (req, res, next) => {
  console.log(req);
  console.log('request body', req.body);
  if (req.body === {}) {
    return next({
      log: 'no request body in userController.createAccount',
      message: { err: 'See log' },
    });
  }
  res.locals.data = req.body;
  return next();
};

module.exports = userController;
