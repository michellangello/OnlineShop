const Product = require('../schemas/product');
const R = require('ramda');
const User = require('../schemas/user')

const cFindProducts = R.curry((condition) => Product.find(condition));

const cSkip = R.curry((query, offset, limit) => query.skip((limit * (offset + 1)) - limit))
const cLimit = R.curry((query, count) => query.limit(count))
const cExecuteQuery = R.curry((query) => query.exec())
const cSort = R.curry((arr, what) => arr.sort(what))
const cFindUsers = R.curry((condition) => User.find(condition));
const cFindSingleUser = R.curry((id) => User.findById(id));

const cPopulate = R.curry((query, include) => query.populate(include));
const cSaveInstance = R.curry((instance) => instance.save());


module.exports = {
    cSort,
    cFindSingleUser,
    cFindProducts,
    cSkip,
    cLimit,
    cExecuteQuery,
    cFindUsers,
    cPopulate,
    cSaveInstance
}