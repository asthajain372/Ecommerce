
const usermodel = require('../db/User');
const Jwt = require('jsonwebtoken');
const jwtkey = 'e-comm';
const bcrypt = require('bcrypt');
const rolemodel = require('../db/Roles');

async function signup(req, res) {
    const { name, email, password } = req.body;
    const type = req.body.type || 'Buyer';
    console.log("type", type);
    const roles = [type]
    //  const data = req.body; // Removed await since req.body is not a promise
    console.log(roles);
  
    try {
        const existinguser = await usermodel.findOne({ email });
        const data = await rolemodel.findOne({ roles: type });
        const roles = data._id;
          console.log(data._id);

        if (!existinguser) {
            let hashedpassword = await bcrypt.hash(password, 12);
            let user = new usermodel({ name, email, password: hashedpassword, type, roles: [roles] }); 
            await user.save();

            Jwt.sign({ user }, jwtkey, { expiresIn: '9h' }, (err, token) => {
                if (err) {
                    res.status(401).send({ result: "something went wrong" });
                }
                res.status(200).send({ user, auth: token });
            })

        } else {
            res.status(400).send({ result: "User already exists" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ result: "Internal Server Error" });
    }
}

async function login(req, res) {

    const { email, password } = req.body;
    const user = req.body;

    try {
        // const existinguser = await usermodel.findOne({email});
        let existinguser = await usermodel.findOne({ email }).populate('roles');
        // const roleid = existinguser.roles;
        // const userid = existinguser._id;
        //  existinguser = await usermodel.findOne({email}).populate(id);
        //  let roles = await rolemodel.findOne({ _id : roleid});
        //  console.log(userid);

        if (!existinguser) {
            res.status(404).json({ message: "User don't Exist." })
        }

        // const existinguserid = await usermodel.findOne({_id:userid}).populate(roles);

        // const roles = existinguser.roles;
        // console.log(existinguser);
        // const data = await rolemodel.findOne({ roles:roles });
        // console.log(data);

        const ispassword = await bcrypt.compare(password, existinguser.password);
        if (!ispassword) {
            res.status(400).json({ message: "Invalid credentials" })
        }

        // res.send(existinguser);

        Jwt.sign({ user }, jwtkey, { expiresIn: '8h' }, (err, token) => {
            if (err) {
                res.status(401).send({ result: "wrong token" });
            } else {
                res.status(200).send({ existinguser, token });
            }
        });
    } catch (err) {
        res.status(500).send({ result: "internal server error" });
    }
}

module.exports = { signup, login };
