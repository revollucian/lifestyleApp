const Joi = require('joi');
const { password } = require('./utils.validation');

const userSignUp = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    username: Joi.string().required(),
    name: Joi.string().required().min(5),
  }),
};

const userLogin = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required().custom(password),
  }),
};

const userPasswordChange = {
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
    new_password: Joi.string().required().custom(password),
  }),
};

const userPasswordChangeNonAuth = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    new_password: Joi.string().required().custom(password),
  }),
};

const userNameChange = {
  body: Joi.object().keys({
    name: Joi.string().required().min(5),
  }),
};

module.exports = {
  userSignUp,
  userLogin,
  userPasswordChange,
  userPasswordChangeNonAuth,
  userNameChange,
};