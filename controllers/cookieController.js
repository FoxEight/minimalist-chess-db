const db = require('../db/');

const cookieController = {};

cookieController.setCookie = function (req, res, next) {
  res.cookie('test', 'testcookie');
  // console.log('RES IN COOKIE CONTROLLER', res);
  return next();
};

cookieController.setSSIDCookie = function (req, res, next) {
  console.log('in set ssid');
  try {
    res.cookie('ssid', res.locals.ssid, {
      httpOnly: true,
      secure: true,
      expire: 30000,
    });
    return next();
  } catch (err) {
    return next({
      log: `Error in cookieController.setSSIDCookie. ERROR: ${err}`,
      message: { err: 'Error in cookieController.setSSIDCookie. See log for details.' },
    });
  }
};

module.exports = cookieController;
