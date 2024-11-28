const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = require('./category.models'); 

const ProductSchema = new Schema({
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
    category: {
        type: Schema.Types.ObjectId,  
        ref: 'Category',  
        required: true,   
    },
    
});
ProductSchema.virtual('availability').get(function () {
    return this.stock > 0;
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
