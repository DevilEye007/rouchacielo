//ProductModel.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },
    Discounted_price: {
        type: Number,
    },
    category: {
        type: String,
        enum: ['Casual Wear', 'Printed Shirt', 'Ladies Shirt'], // Enum for category
        required: true,
      },
    picture: {
        type: String,
        required: true
    }, // Assume URL to image
    ratings: {
        type: Number,
        min: 0, max: 5
    },
});


module.exports = mongoose.model('Product', productSchema);
