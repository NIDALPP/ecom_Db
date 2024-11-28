const mongoose=require('mongoose')
const Schema=mongoose.Schema
const Product =require('./products.models')
const { required } = require('../helpers/validation')
const categorySchema= new Schema({
    id:{
        type:Number,
        unique:true,
        index:true,
        required:true
    },
    name:{
        unique:true,
        type:String,
        required:true
    },
    parentId:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        default:null
    },
    products:{
        type:[Schema.Types.ObjectId],
        ref:'Product',
        default:null
        
    }
})
const category=mongoose.model('Category',categorySchema)
module.exports=category  
