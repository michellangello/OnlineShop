var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
    },
    images: {
        type: [String]
    }
});

module.exports = mongoose.model('Product', productSchema);