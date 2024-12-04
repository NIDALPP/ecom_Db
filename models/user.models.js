const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const Counter = require('./counterModel')






const userSchema = new Schema({
    userId: {
        type: String,
        unique: true
    },

    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin']
    }

})

userSchema.pre('save', async function (next) {
    const user = this
    if (user.userId) {
        return next()
    }
    try {
        const counter = await Counter.findByIdAndUpdate(
            { _id: 'userId' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        )
        user.userId=`USR${String(counter.seq).padStart(3,'0')}`
        next()
    } catch (error) {
        next(error)
    }
})

userSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
    }
    catch (error) {
        throw error

    }
}

const User = mongoose.model('User', userSchema)
module.exports = User;
