var jwt = require('jsonwebtoken');
require('dotenv').config();

const createJWTToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_ENCRYPTION_SECRET, {
        expiresIn: "30 days"
    })
};

const verifyJWTToken = (payload) => {
    return jwt.verify(payload, process.env.JWT_ENCRYPTION_SECRET)
};

module.exports = {
    createJWTToken,
    verifyJWTToken,
};