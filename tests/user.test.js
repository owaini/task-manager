
const request = require('supertest')

const app = require('../src/app')

test('Should signup a new user', async () => {
    await request(app).post('/users').send({ 
        name: "Omar",
        email: 'oinjaz@gmail.com',
        password: 'i1111111'
    }).expect(201)
})