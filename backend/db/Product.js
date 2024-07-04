const { default: mongoose } = require("mongoose");
require('./config');

const productschema = mongoose.Schema({
    name:{type:String},
    desc:{type:String},
    url:{type:String},
    file:{type:String},
   
    type:{type:String},
    size:{
        type:Array,
        default:[]
    },
    color:{
        type:Array,
        default:[]
    },
    prize:{type:String}
}, { collection: 'products' });


module.exports = mongoose.model('Products' , productschema);

