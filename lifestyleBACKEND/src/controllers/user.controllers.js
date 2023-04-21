const { User } = require('../models')
const handleAsync = require('../utils/handleAsync')
const { createJWTToken } = require('../utils/token')

/**
 * Create a user
 */
const userSignUp = handleAsync(async (req, res) => {
    try{
        const user = await User.create(req.body)
        res.status(200).send({ message: 'User created' })
    }catch(e){
        console.error(e);
        //code 11000 in mongo is a duplicate document/key
        if(e?.code === 11000) return res.status(409).send({ message: 'User already exists' })
        return res.status(500).send({ message: 'Something went wrong' })
    }
});

/**
 * Log in a user
 */
const userLogin = handleAsync(async (req, res) => {
    try{
        //finding user
        const user = await User.findOne({ username: req?.body?.username }).select("+password")

        //checking if passwords match using the model method
        const match = await user.isPasswordMatch(req?.body?.password)

        //if they dont we respond with 401
        if(!match) return res.status(401).send({ message: 'Incorrect details' })

        //else we send an encoded JWT token
        return res.status(200).send({token: createJWTToken({...user})});
    }catch(e){
        console.error(e);
        return res.status(500).send({ message: 'Something went wrong' })
    }
});

/**
 * User password change
 */
const userPasswordChange = handleAsync(async (req, res) => {
    try{
        const user = await User.findById(req?.user?._id).select("+password")
        //checking if passwords match using the model method
        const match = await user.isPasswordMatch(req?.body?.password)
        if(!match) return res.status(500).send({ message: 'Incorrect password' })
        user.password = req?.body?.new_password
        await user.save()
        return res.status(200).send({ message: 'Password changed' })
    }catch(e){
        console.error(e)
        return res.status(500).send({ message: 'Something went wrong' })
    }
});

/**
 * User password change unauthenticated
 */
const userPasswordChangeNonAuth = handleAsync(async (req, res) => {
    try{
        const user = await User.findOne({email: req?.body?.email}).select("+password")
        if(!user) return res.status(500).send({ message: 'Cant find user' })
        //checking if passwords match using the model method
        const match = await user.isPasswordMatch(req?.body?.password)
        if(!match) return res.status(500).send({ message: 'Incorrect password' })
        user.password = req?.body?.new_password
        await user.save()
        return res.status(200).send({ message: 'Password changed' })
    }catch(e){
        console.error(e)
        return res.status(500).send({ message: 'Something went wrong' })
    }
});

/**
 * User name change
 */
const userNameChange = handleAsync(async (req, res) => {
    try{
        const user = await User.findById(req?.user?._id);
        if(!user) return res.status(500).send({ message: 'Cant find user' })
        user.name = req?.body?.name;
        const newUser = await user.save()
        return res.status(200).send({ message: 'Name changed', user: newUser })
    }catch(e){
        console.error(e)
        return res.status(500).send({ message: 'Something went wrong' })
    }
});

/**
 * Get user own profile details
 */
const userGetProfile = handleAsync(async (req, res) => {
    try{
        const user = await User.findOne({_id: req?.user?._id});
        if(!user) return res.status(500).send({ message: 'Cant find user' })
        return res.status(200).send({user: user?._doc})
    }catch(e){
        console.error(e)
        return res.status(500).send({ message: 'Something went wrong' })
    }
});

/**
 * Get user own profile details
 */
const userDeleteProfile = handleAsync(async (req, res) => {
    try{
        await User.findByIdAndDelete(req?.user?._id);
        return res.status(200).send({ message: "Profile deleted" })
    }catch(e){
        console.error(e)
        return res.status(500).send({ message: 'Something went wrong' })
    }
});

module.exports = {
    userSignUp,
    userLogin,
    userPasswordChange,
    userPasswordChangeNonAuth,
    userNameChange,
    userGetProfile,
    userDeleteProfile,
};