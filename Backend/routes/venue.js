
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Venue = mongoose.model('Venue')
const activity = require('./activity')

router.use("/:venueid/activities",activity)
router.post("/addVenue", (req, res) =>{
    const {ownerId,name, address, info, sports,timeslots} = req.body
    if(!name || !address || !info || !sports || !timeslots ){
        return res.send({"error":"please enter all the details"})
    }
    const venue = new Venue({
        ownerId,
        name: name,
        info: info,
        address: address,
        sports: sports,
        timeslots: timeslots
    })
    venue.save()
    .then((venue) => {
        return res.json({"message":"venue saved successfully"})
    })
    .catch((err) => {
        console.log(err)
    })
})

router.get("/:venueid", (req,res) => {
    Venue.find({_id:req.params.venueid})
    .then((venue) => {
        if (!venue){
            return res.status(200).json({"error":"non existing venue"})
        }
        return res.status(200).json({"venue":venue})
    })
})

router.delete("/delete/:venueid", (req, res) => {
    Venue.findByIdAndDelete({_id:req.params.venueid})
      .then((venue) => {
        if (!venue) {
          return res.status(404).json({ error: "Venue not found" });
        }
        return res.status(200).json({ message: "Venue deleted successfully" });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
      });
  });

  
router.get("/owner/:ownerId", (req, res) => {
    Venue.find({ownerId:req.params.ownerId})
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