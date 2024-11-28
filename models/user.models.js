const mongoose= require('mongoose')
const Schema=mongoose.Schema
const bcrypt = require('bcrypt')


const userSchema = new Schema({
    
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum: ['user', 'admin']
    }

})

userSchema.methods.isValidPassword=async function(password){
    try {
        return await bcrypt.compare(password,this.password)
    }
    catch(error){
        throw error

    }
}

const User=mongoose.model('User',userSchema)
module.exports=User;
