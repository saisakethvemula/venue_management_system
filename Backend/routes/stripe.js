const express = require("express");
const Stripe = require("stripe")
const config = require('config');
const e = require("express");
const { book } = require("../models/bookings");
const key = config.get('STRIPE_SECRET');

const stripe = Stripe(key)

const router = express.Router()
router.post('/payment-checkout', async (req, res) => {
    const customer = await stripe.customers.create({
      metadata:{
        uid : req.body.uid,
        venueName: req.body.venueName,
        activityName:req.body.activityName,
        redirect_url: req.body.current_url
        // time: req.body.time
      }
    })
    const {venueName, activityName, current_url} = req.body;
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: venueName,
              description: activityName
            },
            unit_amount: 1000,
          },
          quantity: 1,
        },
      ],
      customer:customer.id,
      mode: 'payment',
      success_url: "http://localhost:3000/user-profile",
      cancel_url: "http://localhost:3000/user-profile",
    });
  
    res.send({url: session.url});
  });

// const createBooking = async(customer,data)=>{
//   const newBooking = new book({
//     uid: customer.metadata.uid,
//     customerId: data.customer,
//     paymentIntentId: data.payment_intent,
//     venueName:customer.metadata.venueName,
//     court:customer.metadata.court,
//     time:customer.metadata.time,
//     payment_status: data.payment_status
//   });
//   try{
//     const saved = await newBooking.save()

//     console.log("Processed Order",saved);
//   }catch(err){
//     console.log(err);
//   }
// }

// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret;

router.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let data;
  let eventType;

  if(endpointSecret){

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log("Verified");
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    data=event.data.object;
    eventType = event.type;
  }else{
    data = req.body.data.object;
    eventType = req.body.type;
  }

  // Handle the event
  
  if(eventType == "checkout.session.completed"){
    console.log("completed");
    stripe.customers.retrieve(data.customer).then((customer)=>{
      console.log(customer);
      console.log("data:",data);
      // createBooking(customer,data);
    }).catch((err)=> console.log(err.message))
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
});


  module.exports = router;