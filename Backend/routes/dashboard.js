const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const Venue = mongoose.model('Venue')
var citiesList = []

router.use("/venues",require("./venue"))
router.use("/uservenues",require("./uservenue"))
router.use("/stripe",require("./stripe"))
router.use("/bookings",require("./booking"))
router.use("/chatroom", require("./chatroom"));

router.use('/',async(req,res)=>{
    citiesList =  await Venue.find({},{city:1,_id:0})
    return res.send({cities : citiesList})
})

module.exports = router