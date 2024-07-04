const mongoose = require('mongoose');
// require('./db/config');

const orderSchema = new mongoose.Schema({
    user: {
        type: {
            user_id: String,
            name: String,
            email: String,
            // Add other user details as needed
        },
        required: true
    },
    address: {
        type: {
            line1: String,
            line2: String,
            city: String,
            state: String,
            country: String,
            postal_code: String
            // Add other address details as needed
        },
        required: true
    },
    products: [{
        type: {
            product_id: String,
            name: String,
            color: String,
            size: String,
            prize: String,
            amount: Number,
            url:String,
            // Add other product details as needed
        },
        required: true
    }],
    // Add other fields as needed
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
