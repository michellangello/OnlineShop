
const product = require('./productRoute');
const users = require('./usersRoute');

module.exports = (app) => {

  app.use('/products', product);
  app.use('/users', users);

};

