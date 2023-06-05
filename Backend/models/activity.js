const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    info:{
        type: String
    },
    timeslot:{
        type: String,
        required: true
    },
    availability:{
        type: Number,
        required: true
    },
    venueid:{
        type: String,
        required: true
    },
    chargeable:{
        type:Boolean,
    },
    images:{
        type: [String]
    }
})

mongoose.model("Activity",activitySchema)