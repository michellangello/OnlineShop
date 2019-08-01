const validator = require('validator');
const Product = require('./../schemas/product');
const multer = require('multer');
const path = require('path');

var express = require('express');
var router = express.Router();
const R = require('ramda');


const products = [{
    name: "Glasses",
    amount: 3,
    price: 29,
    description: "Great glasses",
    images: ["./assets/images/shop0.jpg", "./assets/images/shop0.jpg"]
},
{
    name: "T-shirt",
    amount: 3,
    price: 199,
    description: "Great T-shirt",
    images: ["./assets/images/shop1.jpg", "./assets/images/shop1.jpg"]
},
{
    name: "Jeans",
    amount: 33,
    price: 59,
    description: "Great Jeans",
    images: ["./assets/images/shop1.jpg", "./assets/images/shop1.jpg"]
}];


const trace = R.curry((tag, x) => {
    console.log(tag, x);
    return x;
});

const cFindProduct = R.curry((condition) => Product.find(condition));
const cSkip = R.curry((query, offset) => query.skip(offset))
const cLimit = R.curry((query, count) => query.limit(count))
const cExecuteQuery = R.curry((query) => query.exec())
const cSort = R.curry((arr, what) => arr.sort(what))

// const r = R.pipe(
//     R.map(R.view(xPath)),
//     R.map(addPath, R.__)
//  )( fields);

 const xPath = R.lensProp('path');

const getSortedProducts = async (req, res) => {

    const offset = parseInt(req.query.offset || 0);
    const limit = parseInt(req.query.limit || 5);
    const sort_by = req.query.sort_by || Product.name;

    var result = await R.pipe(
        cFindProduct,
        cSort(R.__, sort_by),
        cSkip(R.__, offset),
        cLimit(R.__, limit),
        cExecuteQuery,
    )({});

    res.send(result);
}


const wrap = f => async (req, res) => {
    const { status = 200, headers = {}, body = {} } = await f(req);
    res.status(status).set(headers).json(body);
};

const addImage = (path, array) => array.push(path);


const createProduct = wrap(async req => {

    console.log(req.body);
    console.log('req'.files);

    R.map(addImage, )

    return { body: 'kek' };

    const rt = R.pipe(
        R.curry(body => new Product(body)),
        R.curry(model => model.save()),
        R.then(result => { return { body: result } }),
        R.otherwise(error => { return { body: error } })
    )(req.body);

    return rt;
})

const getProducts = (req, res) => {

    var sort = req.query.sort_by;
    var order = req.query.order || 'asc';
    var limit = parseInt(req.query.limit);
    var offset = parseInt(req.query.offset);

    var find = R.curry(Product.find);
    var skip = R.curry(find.skip);

    var r = R.compose(skip, find);
    q
    console.dir(r);
    console.log(r);
    // R.compose(find )
    console.dir(Product.find);
    console.log(Product.find);


    Product
        .find({})
        .skip((limit * offset) - limit)
        .limit(limit)
        .exec(function (err, products) {
            Product.count().exec(function (err, count) {
                if (err) return next(err)

                res.render('main/products', {
                    products: products,
                    current: offset,
                    pages: Math.ceil(count / limit)
                })
            })
        })



    console.dir(sort);

    const result = R.sortBy(R.prop('productPrice'), products);


    res.send(result);
};


const initProductss = async (req, res) => {

    // Product.create(products);

    const insert = (products) => Promise.resolve(Product.insertMany(products));
    const deleteAll = () => Promise.resolve(Product.deleteMany({}));
    const resolveIssue = () => { result: 500 };
    const resolveResult = (result) => {
        console.log(result);
        return result;
    };

    //const tryy = await R.call(deleteProd, {});

    var r = await R.pipe(
        insert,
        R.otherwise(resolveIssue),
        R.then(resolveResult)
    )(products);

    console.log(r);
}




module.exports = {
    getProducts,
    initProductss,
    getSortedProducts,
    createProduct
};


