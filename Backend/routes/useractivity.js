const express = require('express')
const router = express.Router({mergeParams:true})

const mongoose = require('mongoose')
const Activity = mongoose.model('Activity')
const Venue = mongoose.model('Venue')

// router.post("/addActivity", (req, res)=>{
//     const {name, info,timeslot,availability,chargeable} = req.body
//     if(!name || !info || !timeslot || !availability || ! chargeable){
//         return res.send({"error":"please enter all the details"})
//     }
//     console.log({_id:req.params.venueid})
//     Venue.find({_id:req.params.venueid})
//     .then((venue)=>{
//         if (venue.length===0){
//             return res.send({"error":"venue doesn't exists"})
//         }
//         const newActivity = new Activity({
//             name: name,
//             venueid: req.params.venueid,
//             info: info,
//             timeslot: timeslot,
//             availability: availability,
//             chargeable:chargeable
//         })
//         newActivity.save()
//         .then((newActivity) => {
//             return res.json({"message":"venue details saved successfully",activity:{newActivity}})
//         })
//         .catch((err) => {
//             console.log(err)
//         })
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
// })

router.get("/", (req, res) => {
    Activity.find({venueid:req.params.venueid})
    .then((activities) => {
        console.log(req.params.venueid);
        if (!activities){
            return res.status(200).json({"404":"activities not available"})
        }
        return res.send({activities:activities})
    })
    .catch((err)=>{
        console.log(err)
    })
})

router.get("/bookslot",(req,res)=>{
    res.send({message:"hii"})
})

router.get("/bookslot/:activityid",(req,res)=>{
    res.send({message:"hii"})
})
module.exports = router