const Joi = require('joi');
const validateBody = require('../validate.middlewares');

describe('validateBody middleware', () => {
  const schema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().integer().min(18).max(99).required(),
  });

  const req = {
    body: {
      name: 'John Doe',
      age: 25,
    },
  };

  const res = {
    status: jest.fn(() => res),
    send: jest.fn(),
  };

  const next = jest.fn();

  it('should call next middleware when schema is valid', () => {
    const middleware = validateBody({ body: schema });
    middleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('should return a 400 error when schema is invalid', () => {
    const middleware = validateBody({ body: schema });
    req.body = {
      name: 'John Doe',
      age: 'twenty-five',
    };
    middleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      message: '"age" must be a number',
    });
  });
});