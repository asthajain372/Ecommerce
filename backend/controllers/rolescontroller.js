const rolesmodel = require('../db/Roles');

const addRole = async(req, res)=>{
    const roles = req.body.roles;
    const permissions = req.body.permissions;

 console.log(permissions)
 const data = await new rolesmodel({roles , permissions});
 const issaved = await data.save();
 if(issaved){
    res.send(data);
 }
   //  await rolesmodel.insertMany(req.body);
   //  await insertMany(req.body.permissions);
   //  console.log(req.body.roles);
   //  console.log(req.body.permissions);
    res.send("error");
}

module.exports = {addRole};