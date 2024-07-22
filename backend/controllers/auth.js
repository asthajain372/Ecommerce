
require('dotenv').config(); 
const usermodel = require('../db/User');
const Jwt = require('jsonwebtoken');
const jwtkey = process.env.JWT_KEY;
const bcrypt = require('bcrypt');
const rolemodel = require('../db/Roles');

// async function signup(req, res) {
//     const { name, email, password } = req.body;
//     const type = req.body.type || 'Buyer';
//     console.log("type", type);
//     const roles = [type];
//     console.log(roles);
  
//     try {
//         const existinguser = await usermodel.findOne({ email });
//         const data = await rolemodel.findOne({ roles: type });
//         const roles = data._id;
//           console.log(data._id);

//         if (!existinguser) {
//             let hashedpassword = await bcrypt.hash(password, 12);
//             let user = new usermodel({ name, email, password: hashedpassword, type, roles: [roles] }); 
//             await user.save();

//             Jwt.sign({ user }, jwtkey, { expiresIn: '9h' }, (err, token) => {
//                 if (err) {
//                     res.status(401).send({ result: "something went wrong" });
//                 }
//                 res.status(200).send({ user, auth: token });
//             })

//         } else {
//             res.status(400).send({ result: "User already exists" });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ result: "Internal Server Error" });
//     }
// }

async function signup(req, res) {
    const { name, email, password ,url } = req.body;
    const type = req.body.type || 'Buyer';
    console.log("type", type);

    try {
        // Check if the user already exists
        const existinguser = await usermodel.findOne({ email });
        if (existinguser) {
            return res.status(400).send({ result: "User already exists" });
        }

        // Find the role by type
        const roleData = await rolemodel.findOne({ roles: type });
        if (!roleData) {
            return res.status(400).send({ result: "Role not found" });
        }

        const roleId = roleData._id;
        console.log(roleId);

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user
        const user = new usermodel({
            name,
            email,
            password: hashedPassword,
            url,
            type,
            roles: [roleId]
        });
        await user.save();

        // Sign the JWT token
        const tokenPayload = {
            email: user.email,
            id: user._id,
            roles: user.roles
        };

        Jwt.sign(tokenPayload, jwtkey,{ expiresIn: '5d' }, (err, token) => {
            if (err) {
                return res.status(500).send({ result: "Failed to generate token" });
            }
            const userResponse = { ...user._doc };
            delete userResponse.password;
            res.status(200).send({ user:userResponse, auth: token });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ result: "Internal Server Error" });
    }
}



async function login(req, res) {

    const { email, password } = req.body;
    const user = req.body;

    try {
        let existinguser = await usermodel.findOne({ email }).populate('roles');

        if (!existinguser) {
            res.status(404).json({ message: "User don't Exist." })
        }
        const ispassword = await bcrypt.compare(password, existinguser.password);
        if (!ispassword) {
            res.status(400).json({ message: "Invalid credentials" })
        }

        Jwt.sign({  email: existinguser.email, id: existinguser._id }, jwtkey, { expiresIn: '5d' }, (err, token) => {
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
