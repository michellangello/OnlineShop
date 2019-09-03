const jwt = require('jsonwebtoken');



module.exports = {
  checkAuthorize: (expectedRole) => {
    return (req, res, next) => {
      var result;
      const payload = req.decoded;
      if (payload.role.toLowerCase() !== expectedRole.toString().toLowerCase()) {
        result = {
          error: `Authentication error. Access denied.`,
          status: 401
        };
        res.status(401).send(result);
      }
      else
        next();
    };
  },

  validateToken: (req, res, next) => {
    const authorizationHeaader = req.headers.authorization;
    let result;
    if (authorizationHeaader) {
      const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
      const options = {
        expiresIn: '2d',
        issuer: 'https://scotch.io'
      };
      try {
        // verify makes sure that the token hasn't expired and has been issued by us
        result = jwt.verify(token, process.env.JWT_SECRET, options);

        // Let's pass back the decoded token to the request object
        req.decoded = result;
        // We call next to pass execution to the subsequent middleware
        next();
      } catch (err) {
        result = {
          error: `Authentication error. Token required.`,
          status: 401
        };
      }
    } else {
      result = {
        error: `Authentication error. Token required.`,
        status: 401
      };
      res.status(401).send(result);
    }
  }
};