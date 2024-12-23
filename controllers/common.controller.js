const User = require('../models/user.models')
const Product = require('../models/products.models')
const category = require('../models/category.models')
const cart = require('../models/cartModel')
const order = require('../models/orders.models')
const createError = require('http-errors')
const { default: mongoose } = require("mongoose");

module.exports = {
    findOne: async (req, res) => {
        const { model, filter = {}, projections } = req.body
        if (!model || !filter) return res.send({ status: "failed", error: "invalid req" })
        let result = await mongoose.models[model].findOne(filter, projections)
        return res.send({ status: "success", data: result })
    },
    find: async (req, res) => {
        const { model, filter } = req.body
        if (!model) return res.send({ status: "failed", error: "invalid req" })
        const m = mongoose.models[model]
        let result = await m.find(filter)
        return res.send({ status: "success", data: result })
    },
    create: async (req, res) => {
        const { model, data } = req.body;
        if (!model) return res.send({ status: "failed", error: "model not found" });
        try {
            const m = new mongoose.models[model](data);
            const result = await m.save();
            return res.send({ status: "success", data: result });
        } catch (error) {
            console.error("Error creating document:", error);
            return res.send({ status: "failed", error: error.message });
        }
    },
    deleteOne: async (req, res) => {
        const { model, filter, } = req.body;
        if (!model || !filter) return res.send({ status: "failed", error: "invalid requirements" })
        try {
            const result = await mongoose.models[model].deleteOne(filter,)
            return res.send({ status: "success", data: result })
        } catch (error) {
            console.error("Error deleting document:", error);
        }
    },
    updateOne: async (req, res) => {
        const { model, filter, data } = req.body;

        if (!model || !filter) return res.send({ status: "failed", error: "couldn't find model" })
        try {
            const m = mongoose.models[model]

            const result = await m.updateOne(filter, { $set: data });
            return res.send({ status: "success", data: result })
        } catch (error) {
            console.error("Error updating document:", error);
        }
    },
    findOneAndUpdate: async (req, res) => {
        const { model, filter, data } = req.body
        if (!model) return res.send({ status: "failed", error: "couldn't find model" })
        try {
            const m = mongoose.models[model]

            const result = await m.findOneAndUpdate(filter, { $set: data })
            return res.send({ status: "success", data: result })

        } catch (error) {
            console.error("Error updating document:", error);

        }
    },
    aggregate: async (req, res) => {
        const { model, query } = req.body
        console.log(req.body);
        console.log(JSON.stringify(query),'query');

        const m = mongoose.models[model]
        
        let result = await m.aggregate(query)
        console.log(result);
        
        return res.send({ status: "success", data: result })
    }
};
// [{"$match":{"name":"Smartphones"}},{"$lookup":{"from":"products","localField":"category","foreignField":"categoryId","as":"prod"}},{"$project":{"_id":0,"category_id":1}}]