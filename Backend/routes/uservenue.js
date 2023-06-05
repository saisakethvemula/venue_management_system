
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Venue = mongoose.model('Venue')
const useractivity = require('./useractivity')

router.use("/:venueid/useractivities",useractivity)
// router.post("/addVenue", (req, res) =>{
//     const {name, address, info, sports,timeslots} = req.body
//     if(!name || !address || !info || !sports || !timeslots ){
//         return res.send({"error":"please enter all the details"})
//     }
//     const venue = new Venue({
//         name: name,
//         info: info,
//         address: address,
//         sports: sports,
//         timeslots: timeslots
//     })
//     venue.save()
//     .then((venue) => {
//         return res.json({"message":"venue saved successfully"})
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// })

router.get("/:venueid", (req,res) => {
    Venue.find({_id:req.params.venueid})
    .then((venue) => {
        if (!venue){
            return res.status(200).json({"error":"non existing venue"})
        }
        return res.status(200).json({"venue":venue})
    })
})

router.get("/", (req, res) => {
    Venue.find({})
    .then((venues) => {
        if (!venues){
            return res.status(200).json({"404":"venues not found"})
        }
        
        return res.send({venues:venues})
        })
        .catch((err)=>{
            console.log(err)
        })
})

module.exports = router