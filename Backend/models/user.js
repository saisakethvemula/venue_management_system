const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String,
        required: true 
    },
    uid:{
        type: String,
    },
    password:{
        type: String
    },
    isOwner:{
        type: Boolean
    },
    phone:{
        type: String
    },
    city:{
        type: String
    },
    intrests:{
        type: [String]
    },
    logintype:{
        type: String
    }
})

mongoose.model("User",userSchema)