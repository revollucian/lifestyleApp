const Joi = require('joi');

const productGet = {
    params: Joi.object().keys({
      code: Joi.number().required(),
    }),
};

module.exports = {
    productGet,
};