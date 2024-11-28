const express = require('express')
const morgan = require('morgan')
require('./helpers/init_mongodb')
require('./helpers/init_redis')
const createError = require('http-errors')
require('dotenv').config()
// const userRoute = require('./routes/user.route')
const crudRoutes=require("./routes/crud")


const app = express()
app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app.use('/user', userRoute)
app.use("/crud",crudRoutes)



app.use(async (req, res, next) => {
    next(createError.NotFound())
})
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        status: err.status || 500,
        message: err.message
    })
})
const port = process.env.PORT || 2000

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})

// const mongoose = require('mongoose');

// const resetDatabase = async () => {
//     try {
//         // Drop the entire database
//         await mongoose.connection.dropDatabase();
//         console.log('Database has been reset (all collections dropped).');
//     } catch (error) {
//         console.error('Error resetting database:', error);
//     }
// };
// resetDatabase()