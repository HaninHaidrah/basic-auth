'use strict'

const { server } = require('../src/server');
const { sequelize } = require('../src/auth/models/index');
const supertest = require('supertest');
const mockRequest = supertest(server);

beforeAll(async () => {
    await sequelize.sync()
});

afterAll(async () => {
    await sequelize.drop()
});

describe('server testing', () => {

    test('check for signup', async () => {
        const respons = await mockRequest.post('/signup').send({
            username: "hanin",
            password: "123"
        });
        expect(respons.status).toBe(201)
        
    });
    
   
    test('check for signin', async () => {
        const respons = await mockRequest.post('/signin').auth('admin', 'admin');
        expect(respons.status).toEqual(500)
    });
    test('check for signin & signup', async () => {
        const user = await mockRequest.post('/signup').send({
            username: "admin",
            password: "admin"
        });
        const respons = await mockRequest.post('/signin').send({
            username: "admin",
            password: "admin"
        }).auth(user.body.username,'admin')
        expect(respons.status).toBe(200)

    });



})