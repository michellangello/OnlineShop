
const product = require('./products.route');
const users = require('./users.route');
const roles = require('./roles.route');

module.exports = (app) => {

  app.use('/products', product);
  app.use('/users', users);
  app.use('/roles', roles)

};

