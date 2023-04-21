const request = require('supertest');
const app = require('../../app'); // Express app

jest.mock("../../middlewares/authentication.middlewares", () => ({
    permissionsUser: () => (_, __, next) => next()
}));

describe('product routes', () => {
    test('GET /:code', async () => {
        const res = await request(app)
          .get(`/v1/products/5449000120984`)
          
        expect(res.status).toBe(200);
    });
})