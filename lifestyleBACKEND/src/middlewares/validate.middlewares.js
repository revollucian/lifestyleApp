const Joi = require('joi');
const get = require('../utils/get');

const validateBody = (schema) => (req, res, next) => {
  const validSchema = get(schema, ['params', 'query', 'body']);
  const object = get(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return res.status(400).send({message: `${errorMessage}`});
  }
  Object.assign(req, value);
  return next();
};

module.exports = validateBody;