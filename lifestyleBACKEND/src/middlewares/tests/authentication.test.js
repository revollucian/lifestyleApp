const { permissionsUser, permissionsAdministrator } = require('../authentication.middlewares');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');

// Mocking
jest.mock('jsonwebtoken');
jest.mock('../../models');

// Helper function
const createReqResNext = () => ({
  req: { headers: { authorization: 'Bearer testToken' } },
  res: { status: jest.fn().mockReturnThis(), json: jest.fn(), send: jest.fn() },
  next: jest.fn(),
});

describe('permissionsUser middleware', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call next if the user is valid', async () => {
    const { req, res, next } = createReqResNext();
    const decoded = { _doc: { _id: '12345' } };
    jwt.verify.mockReturnValue(decoded);
    User.findById.mockResolvedValue({});

    await permissionsUser()(req, res, next);
    expect(next).toHaveBeenCalled();
  });

});

describe('permissionsAdministrator middleware', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call next if the user is an admin', async () => {
    const { req, res, next } = createReqResNext();
    const decoded = { _doc: 'admin' };
    jwt.verify.mockReturnValue(decoded);
    User.findById.mockResolvedValue({});

    await permissionsAdministrator()(req, res, next);
    expect(next).toHaveBeenCalled();
  });

});