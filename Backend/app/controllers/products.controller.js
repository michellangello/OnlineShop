const Product = require('../schemas/product');
const R = require('ramda');
const { cSort, cFindProducts, cSkip, cLimit, cExecuteQuery } = require('../helpers/helper');
const { wrap } = require('../helpers/functional');

const trace = R.curry((tag, x) => {
    console.log(tag, x);
    return x;
});

const getSortedProducts = wrap(async req => {

    const offset = parseInt(req.query.offset || 0);
    const limit = parseInt(req.query.limit || 5);
    const sort_by = req.query.sort_by || Product.name;

    var result = await R.pipe(
        cFindProducts,
        cSort(R.__, sort_by),
        cSkip(R.__, offset, limit),
        cLimit(R.__, limit),
        cExecuteQuery,
    )({});

    return { body: result };
});


const createProduct = wrap(async req => {

    const rt = R.pipe(
        R.curry(body => new Product(body)),
        R.curry(model => model.save()),
        R.then(result => { return { body: result }; }),
        R.otherwise(error => { return { body: error }; })
    )(req.body);

    return { body: rt };
});

module.exports = {
    getSortedProducts,
    createProduct
};


