const mongoose = require('mongoose')
require('dotenv').config();
const uri = process.env.MONGODB_URL;

mongoose.connect(uri, {
    dbName: process.env.DB_NAME,
})

    .then(() => console.log('connected to Mongo db'))
    .catch((err) => console.log(err.message))

mongoose.connection.on('connected', () => {
    console.log("connected to MongoDb")
})

mongoose.connection.on('error', (err) => {
    console.log(err.message)
})
mongoose.connection.on('disconnected', () => {
    console.log("disconnected from MongoDb")
})
process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
})