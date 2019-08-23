const mongoose = require('mongoose');

let roleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

const Role = mongoose.model('Role', roleSchema);
module.exports = Role;

roleSchema.initialize = () => {
    Role.findOne({ name: 'User' }).then(role => {
        if (!role) {
            Role.create({ name: 'User' });
        }
    });

    Role.findOne({ name: 'Admin' }).then(role => {
        if (!role) {
            Role.create({ name: 'Admin' });
        }
    });
};


roleSchema.method({

    getDefault: function () {
        Role.findOne({ name: 'User' }).then(role => {
            if (!role) {
                Role.create({ name: 'User' });
            }
        });

        Role.findOne({ name: 'Admin' }).then(role => {
            if (!role) {
                Role.create({ name: 'Admin' });
            }
        });
    }
});