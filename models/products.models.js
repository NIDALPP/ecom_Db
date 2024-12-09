const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Category = require('./category.models')
const Counter = require('./counterModel');

const ProductSchema = new Schema({
    productId:{
        type:String,
        unique:true
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    category:{
        type:String,
    },
})
ProductSchema.pre('save', async function (next) {
    const product = this
    if (product.productId) {
        return next()
    }
    try {
        const counter = await Counter.findByIdAndUpdate(
            { _id: 'productId' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        )
        product.productId=`PDT${String(counter.seq).padStart(3,'0')}`
        next()
    } catch (error) {
        next(error)
    }
})

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
