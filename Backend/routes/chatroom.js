const router = require("express").Router();
const mongoose = require("mongoose")
const Message = require('../models/Message')
const Chatroom = require('../models/Chatroom')

router.get("/", async (req, res) => {
  const chatrooms = await Chatroom.find({});
  res.json(chatrooms);
});
router.post("/", async (req, res) => {
    const { name } = req.body;
    console.log(name);
    if(name === ""){
        return res.redirect("/")
    }
    const nameRegex = /^[A-Za-z\s]+$/;

    if (!nameRegex.test(name)) 
    {
        res.status(401).send("Chatroom name can contain only alphabets.")
    }

    const chatroomExists = await Chatroom.findOne({ name });

    if (chatroomExists) 
    {
        res.status(401).send("Chatroom name already exists")
    }
    const chatroom = new Chatroom({
      name,
    });

    await chatroom.save();

    res.json({
      message: "Chatroom created!",
    });
});
router.get("/:chatroomId",async(req,res)=>{
    Message.find({chatroom: req.params.chatroomId})
          .then((messages)=>{
            if( !messages){
                res.json({message:"no messages found"})
            }
            res.status(200).json(messages)
         })
          .catch((err)=>{
            return res.redirect("/")
          })
})

router.post("/:chatroomId",(req,res)=>{
  // roomid = req.params.chatroomId;
  var room_name="";
  Chatroom.find({_id:req.body.chatroom})
          .then((chatroom)=>{
            if (!chatroom){
              return res.status(200).json({"error":"non existing chatroom"})
          }
            const message = new Message({
              chatroom : req.body.chatroom,
              username :req.body.username,
              message :req.body.message,
              room_name :chatroom[0].name
          });
          message.save().then().catch(err=>{console.log(err);})
          })
          .catch(err=>{console.log(err);})

})

module.exports = router;
