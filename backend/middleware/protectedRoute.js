const Jwt = require('jsonwebtoken');
const jwtkey = process.env.JWT_KEY;

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    
    if (!token) {
        return res.status(403).send({ message: 'No token provided.' });
    }

    Jwt.verify(token, jwtkey, (err, decoded) => {
        if (err) {
           return res.status(500).send({ message: 'Failed to authenticate token.' });
        }
        
        req.userId = decoded.id;

        next();
    });
}

module.exports = verifyToken;

