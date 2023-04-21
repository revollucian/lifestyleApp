const jwt = require('jsonwebtoken');
const { User } = require('../models')
require('dotenv').config();


const permissionsUser = () => async (req, res, next) => {
    try {
        if (!req?.headers?.authorization) {
            return res.status(403).json({ error: 'No credentials sent!' });
        }
        const token = req?.headers?.authorization.replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_ENCRYPTION_SECRET);
        const user = await User.findById(decoded?._doc?._id);
        if(!user) return res.status(401).send({ message: 'User does not exist' })

        req.user = decoded?._doc
        next()
    } catch(err) {
        return res.status(403).json({ error: 'Token is not valid' });
    }
};

const permissionsAdministrator = () => async (req, res, next) => {
    try {
        if (!req?.headers?.authorization) {
            return res.status(403).json({ error: 'No credentials sent!' });
        }
        const token     = req?.headers?.authorization.replace('Bearer ', '')
        const decoded   = jwt.verify(token, process.env.JWT_ENCRYPTION_SECRET);
        const user      = await User.findById(decoded?._doc?._id);
        if(!user) return res.status(401).send({ message: 'User does not exist' })
        if(decoded?._doc !== 'admin') return res.status(403).json({ error: 'Unauthorized, admin only route' });

        req.user = decoded?._doc
        next()
    } catch(err) {
        return res.status(403).json({ error: 'Token is not valid' });
    }
}

module.exports = {
    permissionsUser,
    permissionsAdministrator,
};


