const mongoose=require('mongoose')
const Counter = require('./counterModel')
const { required } = require('joi')
const Schema=mongoose.Schema


const orderSchema=new Schema({
    orderId:{
        type:String,
        unique:true
    },
    address:{
        type:String,
        required:true

    },
    userId:{
        type:String,
        required:true
        },
        items: [
            {
                productId: {
                    type: String,
                    required: true,
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
    status:{
        type:String,
    },
    totalAmount:{
        type:Number,
        required:true
        },
}
)
orderSchema.pre('save', async function (next) {
    const order = this
    if (order.orderId) {
        return next()
    }
    try {
        const counter = await Counter.findByIdAndUpdate(
            { _id: 'orderId' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        )
        order.orderId=`ORD${String(counter.seq).padStart(3,'0')}`
        next()
    } catch (error) {
        next(error)
    }
})

const order=mongoose.model('order',orderSchema)
module.exports=order  