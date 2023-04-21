const request = require('supertest');
const app = require('../../app'); // Express app
const { User } = require('../../models');
const { createJWTToken } = require('../../utils/token')

jest.mock('../../models'); 
jest.mock('../../utils/token', () => ({
    createJWTToken: () => ({
        username: 'testUsername',
        password: 'testUsername1',
    })
}));
jest.mock('../../middlewares/authentication.middlewares', () => ({
    permissionsUser: () => (_, __, next) => next()
}));

describe('user routes', () => {
    test('POST /login', async () => {
        const userData = {
            username: 'testUsername',
            password: 'testUsername1',
        };

        User.findOne = jest.fn().mockImplementationOnce(() => ({ 
            select: jest.fn().mockImplementationOnce(() => ({
                isPasswordMatch: jest.fn().mockResolvedValueOnce(true)
            })),
        }));

        const res = await request(app)
          .post(`/v1/users/login`)
          .send(userData)
          
        expect(res.status).toBe(200);
        expect(res.body.token).toEqual(userData);
    });

    test('POST /login wrong information', async () => {
        const userData = {
            username: 'testUsername',
        };
        const res = await request(app)
          .post(`/v1/users/login`)
          .send(userData)
          
        expect(res.status).toBe(400);
    });

    test('POST /signup', async () => {
        const userData = {
            email: 'test@test.com',
            username: 'testUsername',
            password: 'testUsername1',
            name: 'testName',
        };
        User.create = jest.fn().mockResolvedValueOnce(true);
        const res = await request(app)
          .post(`/v1/users/signup`)
          .send(userData)
          
        expect(res.status).toBe(200);
        expect(res.body.message).toEqual('User created');
    });

    test('POST /signup wrong information', async () => {
        const userData = {
            email: 'test@test.com',
            username: 'testUsername',
            name: 'testName',
        };
        const res = await request(app)
          .post(`/v1/users/signup`)
          .send(userData)
          
        expect(res.status).toBe(400);
    });

    test('PUT /password-change', async () => {
        const userData = {
            password: 'testUsername1',
            new_password: 'testUsername2',
        };
        User.findById = jest.fn().mockImplementationOnce(() => ({ 
            select: jest.fn().mockImplementationOnce(() => ({
                isPasswordMatch: jest.fn().mockResolvedValueOnce(true),
                save: jest.fn()
            })),
        }));
        const res = await request(app)
          .put(`/v1/users/password-change`)
          .send(userData)
        expect(res.status).toBe(200);
        expect(res.body.message).toEqual('Password changed');
    });

    test('PUT /password-change wrong information', async () => {
        const userData = {
            password: 'testUsername1',
        };
        const res = await request(app)
          .put(`/v1/users/password-change`)
          .send(userData)
        expect(res.status).toBe(400);
    });

    test('PUT /password-change-non-auth', async () => {
        const userData = {
            email: 'test@test.com',
            password: 'testUsername1',
            new_password: 'testUsername2',
        };
        User.findOne = jest.fn().mockImplementationOnce(() => ({ 
            select: jest.fn().mockImplementationOnce(() => ({
                isPasswordMatch: jest.fn().mockResolvedValueOnce(true),
                save: jest.fn()
            })),
        }));
        const res = await request(app)
          .put(`/v1/users/password-change-non-auth`)
          .send(userData)
        expect(res.status).toBe(200);
        expect(res.body.message).toEqual('Password changed');
    });

    test('PUT /password-change-non-auth wrong information', async () => {
        const userData = {
            password: 'testUsername1',
            new_password: 'testUsername2',
        };
        const res = await request(app)
          .put(`/v1/users/password-change-non-auth`)
          .send(userData)
        expect(res.status).toBe(400);
    });

    test('PUT /name-change', async () => {
        const userData = {
            name: 'Testy McTest',
        };
        User.findById = jest.fn().mockImplementationOnce(() => ({ 
            save: jest.fn()
        }));
        const res = await request(app)
          .put(`/v1/users/name-change`)
          .send(userData)
        expect(res.status).toBe(200);
        expect(res.body.message).toEqual('Name changed');
    });

    test('PUT /name-change wrong information', async () => {
        const userData = {
        };
        const res = await request(app)
          .put(`/v1/users/name-change`)
          .send(userData)
        expect(res.status).toBe(400);
    });

    test('GET /profile', async () => {
        const userData = {
            _doc: {
                name: 'testData',
                email: 'testData'
            }
        }
        User.findOne = jest.fn().mockResolvedValueOnce(userData);
        const res = await request(app)
          .get(`/v1/users/profile`)
        expect(res.status).toBe(200);
        expect(res.body.user).toEqual(userData?._doc);
    });

    test('DELETE /delete-profile', async () => {
        User.findByIdAndDelete = jest.fn().mockResolvedValueOnce(true);
        const res = await request(app)
          .delete(`/v1/users/delete-profile`)
        expect(res.status).toBe(200);
        expect(res.body.message).toEqual('Profile deleted');
    });

})