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
        // default:'user'
    }

})
userSchema.pre('save',async function(next){
    try {
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(this.password,salt)
        this.password=hashedPassword
        next()
        
    } catch (error) {
        next(error)
        
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
