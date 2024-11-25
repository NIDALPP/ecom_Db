const mongoose=require('mongoose')
const Schema=mongoose.Schema

const categorySchema= new Schema({
    id:{
        type:Number,
        unique:true,
        indexedDB:true,
        required:true
    },
    catName:{
        type:Number,
        required:true
    },
    parentId:{
        type:Number,
        required:true
    }
})