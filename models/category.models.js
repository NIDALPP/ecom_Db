const mongoose=require('mongoose')
const Schema=mongoose.Schema
const Product =require('./products.models')
const Counter = require('./counterModel')
const { string } = require('joi')
const categorySchema= new Schema({
    categoryId:{
        type:String,
        unique:true
    },
    name:{
        unique:true,
        type:String,
        required:true
    },
    parentId:{
        type:String,
        default:null
    },
    products:{
        type:[String],
        default:null
        
    }
})

categorySchema.pre('save', async function (next) {
    const category = this
    if (category.categoryId) {
        return next()
    }
    try {
        const counter = await Counter.findByIdAndUpdate(
            { _id: 'categoryId' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        )

        category.categoryId=`CAT${String(counter.seq).padStart(3,'0')}`
        next()
    } catch (error) {
        next(error)
    }
})
const category=mongoose.model('Category',categorySchema)
module.exports=category  
