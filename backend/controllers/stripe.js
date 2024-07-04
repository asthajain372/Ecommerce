
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const ordermodel = require('../db/Order');





// const SITE_URL = process.env.REACT_APP_SITE_URL;
// const FRONT_URL = process.env.REACT_APP_FRONT_URL;



const SITE_URL = process.env.SITE_URL ;
const FRONT_URL = process.env.FRONT_URL ;
const STRIPE_KEY = process.env.STRIPE_KEY ;


const stripe = require("stripe")(STRIPE_KEY);
// console.log(STRIPE_KEY);

// console.log("siteUrl",siteUrl);
const paymethod = async(req, res)=>{
    try {

        const product = req.body;
        const product_data = product.products;
        const metadata = product_data.reduce((metadata, product, index) => {

          metadata[`product_${index}_id`] = product._id;
          metadata[`product_${index}_name`] =product.name;
            metadata[`product_${index}_color`] = product.color;
            metadata[`product_${index}_size`] = product.size;
            metadata[`product_${index}_prize`] = product.prize;
            metadata[`product_${index}_amount`] = product.amount;
            metadata[`product_${index}_url`] = product.url;
            return metadata;
          }, {});

          const metadataString = JSON.stringify(metadata);

        const lineItems = product_data.map((product) => ({


          price_data: {
            currency: "inr",
            product_data: {
            name: product.name, 
              description: ` color:${product.color}  size:${product.size}` ,
            },
         
            unit_amount: Number(product.prize) * 100,
          },
          quantity: product.amount,
        }));
    
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: lineItems,

    billing_address_collection: "required",
    shipping_address_collection: {
      allowed_countries: ["IN" ], // Restrict shipping options to India
    },

          mode: "payment",

          success_url: `${SITE_URL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${FRONT_URL}/cart`,        
          metadata:  {    
            metadata : metadataString ,
            user_id : product.user._id,
          }  
        });

        res.json({ id: session.id });
      } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).send("Error creating checkout session");
      }
    }
    
    const orderdata = async(req, res)=>{
    
      try {
        // Retrieve the Checkout Session
        const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
        // Retrieve line items associated with the session
        const lineItems = await stripe.checkout.sessions.listLineItems(req.query.session_id);
        
        const data =  lineItems.data.map((val)=>{
            // console.log(val.description);
            // console.log(val.amount_total);
            // console.log(val.quantity);
            // console.log(val.price.unit_amount);
        })
        
        // let datas = session.metadata.metadata;

        const datas = JSON.parse(session.metadata.metadata);
        const user_id = session.metadata.user_id;

        
        // const orders = await ordermodel.find();
        console.log("datas");
        console.log(datas);
        
        productsdata =[];

        for (let i = 0; i < Object.keys(datas).length / 7; i++) {
            const product = {
                product_id: datas[`product_${i}_id`],
                name: `${datas[`product_${i}_name`]}`, // You can replace this with the actual product name if available
                color: datas[`product_${i}_color`],
                size: datas[`product_${i}_size`],
                prize: datas[`product_${i}_prize`],
                amount: parseInt(datas[`product_${i}_amount`]),
                url: datas[`product_${i}_url`],
            };
            productsdata.push(product);
        }

        const ordersToInsert = [
            {
                user: {
                  user_id:user_id,
                    name: session.customer_details.name,
                    email: session.customer_details.email
                },
                address:{
                    line1: session.customer_details.address.line1,
                    city: session.customer_details.address.city,
                    state:session.customer_details.address.state,
                    postal_code:session.customer_details.address.postal_code
                },
                products: productsdata.map((product) => ({
                    product_id: product.product_id,
                    name: product.name,
                    color: product.color,
                    size: product.size,
                    prize: product.prize,
                    amount: product.amount,
                    url: product.url
                }))
            }
        ];

        // Define an async function to use await
        async function insertOrders() {
            try {
                const result = await ordermodel.insertMany(ordersToInsert);
            } catch (error) {
                console.error("Error inserting orders:", error);
            }
        }

        // Call the async function
        insertOrders();
        res.redirect(`${FRONT_URL}/order`);
        // res.redirect(`/${req.get('origin')}/order`);

      } catch (error) {
        console.error("Error retrieving session or line items:", error);
        res.status(500).send("Error retrieving session or line items");
      }
    }

module.exports = {paymethod , orderdata };