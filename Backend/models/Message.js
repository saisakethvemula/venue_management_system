const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  chatroom: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  username:{
    type:String,
    required:true
  },
  message: {
    type: String,
    required: true,
  },
  room_name:{
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Message", messageSchema);
