const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();
require('./db/config');
const usermodel = require('./db/User');
const auth = require('./controllers/auth');
const {signup , login} = require('./controllers/auth')
const { addRole } = require('./controllers/rolescontroller');
const { paymethod ,orderdata } = require('./controllers/stripe');
const {addproduct , getproduct , deleteproduct ,updateproduct , getsingleproduct } = require('./controllers/productcontroller');
const {getorders} = require('./controllers/ordercontroller');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

console.log(process.env.REACT_APP_SITE_URL);

const port = process.env.PORT ;

// const stripe = require("./controllers/stripe");
// const stripe = require("stripe")("sk_test_51OA4XLSB2fKJnUAPOWQ53NySJjzlCnMWptImrCkDWDmu2kCtyMASJkUTBdr45BIy0RBPhDfvka65Rkf4UbvdFo8y00qFumXTyG");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb ) {
      cb(null, req.body.url)
      // console.log(file.originalname);
      // console.log(req.body.url);
      // cb(null,  req.body.url)
      console.log(JSON.stringify(req.body.url))
    }
  })
  
  // console.log(data);
  const upload = multer({ storage: storage })

app.use("/public/images", express.static(path.join(__dirname,"/public/images")))

app.use(express.json());
app.use(cors());
app.get('/',async(req , res)=>{
    res.send("hello");
       const data =  await usermodel.find();
      //  console.log(data);
})

// app.use("/stripe", stripe);
// app.post('/stripe/create-checkout-session',checkout);




// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true }
//   // add other fields as necessary
// });

// const Productss = mongoose.model('test', productSchema);



// app.get('/products', async (req, res) => {
//   try {
//     const products = await Productss.find({});
//     res.json(products);
//   } catch (error) {
//     res.status(500).send('Error retrieving products');
//   }
// });



app.post('/signup' , signup );
app.post('/login' , login );
app.post('/addrole' , addRole );
app.post('/add', upload.single('file') , addproduct );
app.get('/product',getproduct);
app.get('/order', getorders);
app.delete('/product/:id',deleteproduct);
app.get('/singleproduct/:id',getsingleproduct);
app.put('/update/:newid', upload.single('file')  , updateproduct);
app.post('/api/create-checkout-session', paymethod);
app.get('/order/success', orderdata );
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});