const mongoose = require('mongoose');
const User = require('../schemas/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logger = require('morgan');
const { cPopulate, cSort, cFindUsers, cSkip, cLimit, cExecuteQuery, cFindSingleUser, cSaveInstance } = require('../helpers/helper')
const { curry, pipe, then, otherwise } = require('ramda');
const Roles = require('../schemas/role')
const { wrap } = require('../helpers/functional')
const R = require('ramda');

const deleteUser = wrap(async req => {

    return await pipe(
        curry((id) => User.findOneAndDelete(id)),
        otherwise(error => { status = 400, body = error }),
        then(result => {

            if (!result)
                return { status: 400, body: "User does not exist" };

            return { status: 200, body: result };
        }),
    )(req.params.id);
})

const addUser = wrap(async req => {

    // const { firstname, secondname, password, email } = req.body;
    // let user = new User({ password, firstname, secondname, email });

    // user.save((err, user) => {
    //     if (err) throw err;

    //     Roles.findOne({ name: "User" }).exec().then(res => {

    //         user.role = res;
    //         user.save();
    //         res.users.push(user);
    //         res.save();
    //     });

    //     console.log('User updated successfully');
    // });

    const foundRole = await Roles.findOne({ name: "User" }).exec();

    const savedUser = await R.pipe(
        R.curry(body => new User(body)),
        cSaveInstance,
        R.curry(user => { user.role = foundRole; return user; }),
        R.then(result => result),
        R.otherwise(error => error)
    )(req.body);

    foundRole.users.push(savedUser);
    foundRole.save();

    return { body: savedUser };
})


const trace = R.curry((tag, x) => {
    console.log(tag, x);
    return x;
});


const getSingleUser = wrap(async req => {

    var result = R.pipe(
        cFindSingleUser,
        cExecuteQuery,
    )(req.params.id);

    return { body: await result };
})

const getUsers = wrap(async req => {

    const offset = parseInt(req.query.offset || 0);
    const limit = parseInt(req.query.limit || 5);
    const sort_by = req.query.sort_by || User.name;

    var result = R.pipe(
        cFindUsers,
        cPopulate(R.__, { path: 'role', select: 'name' }),
        cSort(R.__, sort_by),
        cSkip(R.__, offset, limit),
        cLimit(R.__, limit),
        cExecuteQuery
    )({});

    var Tcount = User.count({}).exec();
    console.log(result);
    return {
        body: {
            users: await result,
            totalCount: await Tcount,
            page: offset
        }
    };
})


const updateUser = wrap(async req => {
    return await pipe(
        curry((id) => User.findByIdAndUpdate),
        otherwise(error => { status = 400, body = error }),
        then(result => {

            if (!result)
                return { status: 400, body: "User does not exist" };

            return { status: 200, body: result };
        }),
    )
})


const login = (req, res) => {
    const { login, password } = req.body;

    let result = {};
    let status = 200;

    User.findOne({ email: login })
        .populate('role', 'name')
        .exec((err, user) => {
            if (!err && user) {
                // We could compare passwords in our model instead of below as well
                bcrypt.compare(password, user.password).then(match => {
                    if (match) {
                        status = 200;
                        // Create a token
                        const payload = {
                            user: user.email,
                            role: user.role.name
                        };
                        console.log(payload);

                        const options = { expiresIn: '2d', issuer: 'https://scotch.io' };
                        const secret = process.env.JWT_SECRET;

                        console.log(secret);
                        const token = jwt.sign(payload, secret, options);

                        // console.log('TOKEN', token);
                        result.token = token;
                        result.status = status;
                        result.result = user;
                    } else {
                        status = 401;
                        result.status = status;
                        result.error = `Authentication error`;
                    }
                    res.status(status).send(result);
                }).catch(err => {

                    console.log(err);
                    status = 500;
                    result.status = status;
                    result.error = err;
                    res.status(status).send(result);
                });
            } else {
                status = 404;
                result.status = status;
                result.error = err;
                res.status(status).send(result);
            }
        });
}

module.exports = {
    addUser,
    login,
    getUsers,
    getSingleUser,
    deleteUser,
    updateUser
}