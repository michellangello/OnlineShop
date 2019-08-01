var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    description: {
        type: String,
    },
    totalAmount: {
        type: Number,
        default: 1,
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    orderDetails: {
        _id: mongoose.Schema.Types.ObjectId,
        ref: 'OrderDetails'
    }
});

var orderDetailsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    detailsDescription: {
        type: String,
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
    }
});


module.exports = {
    Order: mongoose.model('Order', orderSchema),
    OrderDetails: mongoose.model('OrderDetails', orderDetailsSchema)
};