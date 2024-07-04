// const Productmodel = require('../db/Product');
const Productmodel = require('../db/Product');

async function addproduct (req , res){
    // Productmodel
    try{
        const { name , desc ,  size , color  , url , type , prize } = req.body;
         
        const data = await new Productmodel({  name , desc , url , size , color ,url , type , prize});
        data.save();
        // const data = req.body;
          res.send(data);
    }catch(err){
        console.log(err);
    }
}

async function getproduct(req , res){
    try{
        const data = await Productmodel.find();
        res.send(data);
    }catch{
        res.status(500).send(result , "somthing went wrong");
    }
}

async function getsingleproduct(req, res) {
    try {
        // Retrieve the product by its ID from the database
        const product = await Productmodel.findById(req.params.id);

        // Check if the product exists
        if (!product) {
            // If product not found, return 404 status code and a message
            return res.status(404).send("Product not found");
        }

        // If product found, send it in the response
        res.send(product);
    } catch (error) {
        // If an error occurs, send a 500 status code and an error message
        res.status(500).send("Something went wrong");
    }
}


async function deleteproduct(req, res){
    try{
        const productId = req.params.id; 
         await Productmodel.findByIdAndDelete(productId);
       data = await Productmodel.find();
        res.send(data);
        //    data.save();
    }catch{
        console.log(error);
    }
}

async function updateproduct(req, res){

    const productId = req.params.newid; 
    //  const data =  await Productmodel.findById(productId)
    const newData = req.body;

       // Updating the document by its ID
       const updatedData = await Productmodel.findByIdAndUpdate(
       productId,
       newData,
       { new: true } // To return the updated document
    );

    if (updatedData) {
        console.log('Updated data:', updatedData);
        res.status(200).json({ message: 'Product updated successfully', updatedData });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
}

module.exports = { addproduct , getproduct , deleteproduct , getsingleproduct ,updateproduct};
