const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail, isAlpha } = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: 'String',
        required: true,
        trim: true,
        required: 'Name address is required',
        validate: [isAlpha, 'Please fill a valid Name']
    },
    secondname: {
        type: 'String',
        required: true,
        trim: true,
        required: 'Surname address is required',
        validate: [isAlpha, 'Please fill a valid Surname']
    },
    password: {
        type: 'String',
        required: true,
        trim: true,
        required: 'Email address is required',
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [isEmail, 'Please fill a valid email address']
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
    }
});


userSchema.pre('save', function (next) {
    const user = this;

    if (!user.isModified || !user.isNew) {
        next();
    } else {
        bcrypt.hash(user.password, 10, function (err, hash) {
            if (err) {
                console.log('Error hashing password for user', user.name);
                next(err);
            } else {
                user.password = hash;
                next();
            }
        });
    }
});

module.exports = mongoose.model('Users', userSchema);