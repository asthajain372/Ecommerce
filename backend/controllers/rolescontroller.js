const rolesmodel = require('../db/Roles');

const addRole = async(req, res)=>{
    const roles = req.body.roles;
    const permissions = req.body.permissions;

 const data = await new rolesmodel({roles , permissions});
 const issaved = await data.save();
 if(issaved){
    res.send(data);
 }
    res.send("error");
}

module.exports = {addRole};