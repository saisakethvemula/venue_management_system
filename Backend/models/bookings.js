const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    uid:{
        type:String
    },
    venueId:{
        type:String
    },
    venueName:{
        type:String
    },
    activityName:{
        type:String
    },
    customerId:{
        type:String
    },
    activityId:{
        type:String
    },
    bookingDate:{
        type:Date
    },
    paymentIntentId:{
        type:String
    },
    venueName:{
        type:String
    },
    court: {
        type:String
    },
    time: {
        type:String
    },
    payment_status:{
        type:String
    }
})

const book = mongoose.model("bookings",bookingSchema)

exports.book =  book;