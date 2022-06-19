const jwt = require('jsonwebtoken');
const AuthError = require('../errors/Auth-err');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (e) {
    throw new AuthError('Необходима авторизация');
  }
  req.user = payload;

  next();
};

module.exports = auth;
