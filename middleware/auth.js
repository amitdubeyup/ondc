const jwt = require('jsonwebtoken');

const authGuard = (req, res, next) => {
  const token = req.body['token'] || req.query['token'] || req.headers['token'];
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, function (error, decoded) {
      if (error) {
        if (error.message === 'jwt expired') {
          return res.send({
            success: false,
            message: 'Session expired!',
          });
        } else {
          return res.send({
            success: false,
            message: 'Authentication failed!',
          });
        }
      } else {
        req['auth'] = decoded.data;
        next();
      }
    });
  } else {
    return res.send({
      success: false,
      message: 'Unauthorized request!',
    });
  }
};

module.exports = authGuard;
