const mongoose = require('mongoose');
const Roles = require('./Roles');

const Usermodel =  new mongoose.Schema({ 
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    type:String ,

    roles:[{type:mongoose.Schema.Types.ObjectId, ref:'Roles' }]
});

module.exports = mongoose.model('user' , Usermodel);
// const Usermodel = mongoose.model('user', new mongoose.Schema({ name: String }));
