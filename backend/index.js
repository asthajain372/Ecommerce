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
const {getorders , ordercount , orderamount , orderchart ,customOrderchart , calculateTotalPrice} = require('./controllers/ordercontroller');
const { getusers , usercount , calculateUserCount  } = require('./controllers/usercontroller');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

console.log(process.env.REACT_APP_SITE_URL);

const port = process.env.PORT ;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb ) {
      cb(null, req.body.url)
      console.log(JSON.stringify(req.body.url))
    }
  })
  
  const upload = multer({ storage: storage })
app.use("/public/images", express.static(path.join(__dirname,"/public/images")))

app.use(express.json());
app.use(cors());

app.get('/',async(req , res)=>{
    res.send("hello");
      //  const data =  await usermodel.find();
      //  console.log(data);
})


app.post('/signup' , signup );
app.post('/login' , login );
app.post('/addrole' , addRole );
app.post('/add', upload.single('file') , addproduct );
app.get('/product',getproduct);
app.get('/getusers',getusers);
app.get('/usercount/:day',usercount);
app.get('/customOrderchart/:start/:end',customOrderchart);
app.get('/orderchart/:day', orderchart);
app.get('/order', getorders);
app.get('/ordercount/:day', ordercount);
app.get('/orderamount/:day', orderamount);
app.get('/calculateTotalPrice/:range', calculateTotalPrice);
app.get('/calculateTotalPrice/:start/:end', calculateTotalPrice);
app.get('/calculateUserCount/:range', calculateUserCount);
app.get('/calculateUserCount/:start/:end', calculateUserCount);
app.delete('/product/:id',deleteproduct);
app.get('/singleproduct/:id',getsingleproduct);
app.put('/update/:newid', upload.single('file')  , updateproduct);
app.post('/api/create-checkout-session', paymethod);
app.get('/order/success', orderdata );
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

