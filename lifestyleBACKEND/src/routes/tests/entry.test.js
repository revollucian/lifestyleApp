const request = require('supertest');
const app = require('../../app'); // Express app
const { Entry } = require('../../models');

jest.mock('../../models'); // mock the Entry model
jest.mock("../../middlewares/authentication.middlewares", () => ({
    permissionsUser: () => (_, __, next) => next()
}));

describe('entry routes', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })
    
    test('GET /:date', async () => {
        const date = '09809809808';
        const user = { _id: 'user123' };
        const entry = { date, user, products: [], total_calories: 0 };
        Entry.findOne.mockResolvedValueOnce(entry);
        const res = await request(app)
          .get(`/v1/entries/${date}`)
          
        expect(res.status).toBe(200);
        expect(res.body.entry).toEqual(entry);
    });

    test('POST /addProduct', async () => {
        const entry = {
            date: '09809809808',
            code: '5449000120984',
            grams_consumed: '50',
            calories_per_100g: '50',
        };
        Entry.findOne.mockResolvedValueOnce(false);
        Entry.create.mockResolvedValueOnce(entry);
  
        const res = await request(app)
          .post(`/v1/entries/addProduct`)
          .send(entry)
          
        expect(res.status).toBe(200);
        expect(res.body.entry).toEqual(entry);
    });

    test('POST /addProduct information missing', async () => {
        const entry = {
            date: '09809809808',
            calories_per_100g: '50',
        };
        const res = await request(app)
          .post(`/v1/entries/addProduct`)
          .send(entry)
        expect(res.status).toBe(400);
    });

    test('POST /addArbitraryProduct', async () => {
        const entry = {
            date: '09809809808',
            product_name: 'product name',
            grams_consumed: '50',
            calories_per_100g: '50',
        };
        Entry.findOne.mockResolvedValueOnce(false);
        Entry.create.mockResolvedValueOnce(entry);
        const res = await request(app)
          .post(`/v1/entries/addArbitraryProduct`)
          .send(entry)

        expect(res.status).toBe(200);
        expect(res.body.entry).toEqual(entry);
    });

    test('POST /getStats', async () => {
        Entry.find.mockImplementationOnce(() => ({
            lean: jest.fn().mockReturnValue({ _id: 'data' }),
        }));
        const res = await request(app)
          .post(`/v1/entries/getStats`)
          .send({})
        expect(res.status).toBe(200);
        expect(res.body.entries).toEqual({ _id: 'data' });
    });

})