const Joi = require('joi');

const entryGetEntry = {
    params: Joi.object().keys({
      date: Joi.number().required(),
    }),
};

const entryAddProduct = {
  body: Joi.object().keys({
    date: Joi.number().required(),
    code: Joi.number().required(),
    grams_consumed: Joi.string().required(),
    calories_per_100g: Joi.string().optional(),
  }),
};

const entryAddArbitraryProduct = {
  body: Joi.object().keys({
    date: Joi.number().required(),
    product_name: Joi.string().required(),
    grams_consumed: Joi.string().required(),
    calories_per_100g: Joi.string().required(),
  }),
};

module.exports = {
  entryGetEntry,
  entryAddProduct,
  entryAddArbitraryProduct
};