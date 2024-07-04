const { default: mongoose } = require("mongoose");

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
});

module.exports = mongoose.model('Products' , productschema);

