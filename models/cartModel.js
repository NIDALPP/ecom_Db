const mongoose = require('mongoose');
const Counter = require('./counterModel');
const Schema = mongoose.Schema;


const cartSchema = new Schema({
    cartId: {
        type: String,
        unique: true
    },
    userId: {
        type: String,
        ref: 'User',
        required: true,
        unique: true,
    },
    items: [
        {
            productId: {
                type: String,
                // ref: 'Product',
                // required: true,
            },
            quantity: {
                type: Number,
            },
            price: {
                type: Number,
                required: true
            }
        },
    ],

},);



cartSchema.pre('save', async function (next) {
    const cart = this
    if (cart.cartId) {
        return next()
    }
    try {
        const counter = await Counter.findByIdAndUpdate(
            { _id: 'CartId' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        )
        cart.cartId = `CRT${String(counter.seq).padStart(3, '0')}`
        next()
    } catch (error) {
        next(error)
    }
})

cartSchema.virtual('totalCost').get(function () {
    return this.items.reduce((total, item) => {
        return total + (item.product.price * item.quantity);
    }, 0);
}),
    cartSchema.pre('save', async function (next) {
        this.items = this.items.reduce((uniqueItems, item) => {
            const existingItem = uniqueItems.find(
                unique => unique.productId.toString() === item.productId.toString()
            );
            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                uniqueItems.push(item);
            }
            return uniqueItems;
        }, []);
        next();
    });



const cart = mongoose.model('Cart', cartSchema)
module.exports = cart;  