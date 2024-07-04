const ordermodel = require('../db/Order');


async function getorders (req , res){

    try{
        const orders = await ordermodel.find(); 
        res.status(200).send(orders);

    }catch(err){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getorders };