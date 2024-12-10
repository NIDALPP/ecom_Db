const express = require("express");
const router = express.Router()
const controller = require("../controllers/common.controller")


router.post("/findOne",controller.findOne)
router.post("/findAll",controller.find)
router.post("/create",controller.create)
router.post("/deleteOne",controller.deleteOne)
router.post("/updateOne",controller.updateOne)
router.post("/records",controller.aggregate,)

module.exports=router