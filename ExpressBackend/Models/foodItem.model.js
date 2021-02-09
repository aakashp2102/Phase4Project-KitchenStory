const mongoose = require('mongoose'), Schema = mongoose.Schema;

const FoodItemSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    containerType: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('FoodItem', FoodItemSchema);