const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { convertToJSON, pagination } = require('../plugins')
const CryptoJS = require('crypto-js')
require('dotenv').config()

const userModel = mongoose.Schema(
    {
      name: { type: String, required: true, trim: true },
      username: { type: String, required: true, trim: true },
      calorie_quota: { type: Number, min: 0, max: 10000, default: 2000 },
      step_quota: { type: Number, min: 0, max: 10000000000, default: 6000 },
      email: { type: String, required: true, unique: true, trim: true, lowercase: true,
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error('Invalid email');
          }
        },
      },
      password: { type: String, required: true, trim: true, minlength: 8, select: false,
        validate(value) {
          if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
            throw new Error('Password must contain at least one letter and one number');
          }
        },
        private: true, // used by the convertToJSON plugin
      },
      role: { type: String, enum: ['user', 'admin'], default: 'user'}
    }
);

// adding the plugins
userModel.plugin(convertToJSON);
userModel.plugin(pagination);

userModel.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
};

userModel.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
      //before save we hash the password we are going to store
      const hashedPassword = await bcrypt.hash(user.password, 8);
      //and then encrypt it using AES and a secret key stored in the environment variables
      user.password = CryptoJS.AES.encrypt(hashedPassword, process.env.AES_ENCRYPTION_SECRET)
    }
    next();
});


userModel.methods.isPasswordMatch = async function (password) {
    const user = this;
    //decrypting the password that we store
    const unencryptedPassword = CryptoJS.AES.decrypt(user?.password, process.env.AES_ENCRYPTION_SECRET).toString(CryptoJS.enc.Utf8)
    //using bcrypt to compare the hash, we never convert the password back into plain text
    return bcrypt.compare(password, unencryptedPassword);
};

const User = mongoose.model('User', userModel);
module.exports = User;

  