const mongoose = require('mongoose');

const roleschema  = mongoose.Schema({
    roles:String,
    permissions:[{type:String}]
});


module.exports = mongoose.model('Roles', roleschema);

