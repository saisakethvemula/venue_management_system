const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt_secret=require("../config/default.json")["JWT_SECRET"]
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
const router = express.Router()
const User = mongoose.model("User");

// app.post("/register", async (req, res) => {
//   const { fname, lname, email, password, userType } = req.body;

//   const encryptedPassword = await bcrypt.hash(password, 10);
//   try {
//     const oldUser = await User.findOne({ email });

//     if (oldUser) {
//       return res.json({ error: "User Exists" });
//     }
//     await User.create({
//       fname,
//       lname,
//       email,
//       password: encryptedPassword,
//       userType,
//     });
//     res.send({ status: "ok" });
//   } catch (error) {
//     res.send({ status: "error" });
//   }
// });

// app.post("/login-user", async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) {
//     return res.json({ error: "User Not found" });
//   }
//   if (await bcrypt.compare(password, user.password)) {
//     const token = jwt.sign({ email: user.email }, jwt_secret, {
//       expiresIn: "15m",
//     });

//     if (res.status(201)) {
//       return res.json({ status: "ok", data: token });
//     } else {
//       return res.json({ error: "error" });
//     }
//   }
//   res.json({ status: "error", error: "InvAlid Password" });
// });

// app.post("/userData", async (req, res) => {
//   const { token } = req.body;
//   try {
//     const user = jwt.verify(token, jwt_secret, (err, res) => {
//       if (err) {
//         return "token expired";
//       }
//       return res;
//     });
//     console.log(user);
//     if (user == "token expired") {
//       return res.send({ status: "error", data: "token expired" });
//     }

//     const useremail = user.email;
//     User.findOne({ email: useremail })
//       .then((data) => {
//         res.send({ status: "ok", data: data });
//       })
//       .catch((error) => {
//         res.send({ status: "error", data: error });
//       });
//   } catch (error) { }
// });

// app.listen(5000, () => {
//   console.log("Server Started");
// });
router.get("/forgot-password",(req,res)=>{
    res.send({page:"forgot-password"})
})

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email:email });
    console.log(oldUser);
    if (!oldUser) {
      return res.send({ message: "User Not Exists!!" });
    }
    const secret = jwt_secret + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "15m",
    });
    const link = `http://localhost:3000/reset-password/${oldUser.email}/${token}`;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "funtripping@gmail.com",
        pass: "vhmenioerihneqkx",
      },
    });

    var mailOptions = { 
      from: "funtripping@gmail.com",
      to: oldUser.email,
      subject: "Password Reset",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        res.send({"message":"email sent successfully"})
      }
    });
    console.log(link);
  } catch (error) { }
});

router.get("/reset-password/:email/:token", async (req, res) => {
  const { email, token } = req.params;
  console.log(req.params);
  const oldUser = await User.findOne({ email : email });
  if (!oldUser) {
    return res.send({ status: "User Not Exists!!" });
  }
  const secret = jwt_secret + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.send({ email: verify.email, message: "Verified" });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
});

router.post("/reset-password/:email/:token", async (req, res) => {
  const { email, token } = req.params;
  const { password, cnfrmpassword } = req.body;

  if(password !== cnfrmpassword){
    return res.send({message:"mismatch"})
  }

  const oldUser = await User.findOne({ email : email });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = jwt_secret + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 12);
    await User.updateOne(
      {
            email: email,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );

    res.send({ email: verify.email, message: "success" });
  } catch (error) {
    console.log(error);
    res.send({ message: "failure" });
  }
});

module.exports = router
