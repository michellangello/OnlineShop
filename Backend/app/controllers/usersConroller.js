const mongoose = require('mongoose');
const User = require('../schemas/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logger = require('morgan');

const addUser = (req, res) => {

    const name = req.body.name;
    const password = req.body.password;

    let user = new User({ name, password });


    user.save((err, user) => {
        console.log('save');
    });

    res.send(user);
}

const login = (req, res) => {
    const { name, password } = req.body;

    let result = {};
    let status = 200;

    User.findOne({ name }, (err, user) => {
        if (!err && user) {
            // We could compare passwords in our model instead of below as well
            bcrypt.compare(password, user.password).then(match => {
                if (match) {
                    status = 200;
                    // Create a token
                    const payload = { user: user.name };
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
    login
}