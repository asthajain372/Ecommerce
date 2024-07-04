//  sk_test_51OA4XLSB2fKJnUAPOWQ53NySJjzlCnMWptImrCkDWDmu2kCtyMASJkUTBdr45BIy0RBPhDfvka65Rkf4UbvdFo8y00qFumXTyG
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.


// const stripe = require('stripe')('sk_test_51OA4XLSB2fKJnUAPOWQ53NySJjzlCnMWptImrCkDWDmu2kCtyMASJkUTBdr45BIy0RBPhDfvka65Rkf4UbvdFo8y00qFumXTyG');
// const express = require('express');
// const stripe = require('stripe')('sk_test_51OA4XLSB2fKJnUAPOWQ53NySJjzlCnMWptImrCkDWDmu2kCtyMASJkUTBdr45BIy0RBPhDfvka65Rkf4UbvdFo8y00qFumXTyG');
const express = require('express');
const Stripe = require("stripe");
const app = express();
require('dotenv').config({path: '.env'})

const stripe = Stripe(process.env.STRIPE_KEY);

app.use(express.static('public'));
const YOUR_DOMAIN = 'http://localhost:3000/';

async function checkout(req , res){

    const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 200 ,
            // price: '{{PRICE_ID}}',
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: "http://localhost:3000/checkout-success",
        cancel_url: "http://localhost:3000/cart",
      });
      res.send({url: session.url});
}

module.exports = {checkout};