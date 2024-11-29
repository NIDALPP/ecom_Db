const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true, 
    },
    items: [
        // {
        //     productId: {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: 'Product',
        //         required: true,
        //     },
        //     quantity: {
        //         type: Number,
        //         required: true,
        //         default: 1,
        //     },
        // },
    ],
}, { timestamps: true });

const cart=mongoose.model('Cart',cartSchema)
module.exports = cart;  