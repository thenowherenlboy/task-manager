const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');

const { userOneId, userOne, setupDb } = require('./fixtures/db');

beforeEach(setupDb);

test ('Should sign up a new user', async () => {
    const response = await request(app)
        .post('/users')
        .send( {
            name: 'Seymour Butz',
            email: 'butz@easynomad.com',
            password: 'read123!'
            })
        .expect(201);

     // Assert database was updated

     const user = await User.findById(response.body.user._id);
     expect(user).not.toBeNull();

     // Assertions about the response
    expect(response.body).toMatchObject( {
        user: {
            name: 'Seymour Butz',
            email: 'butz@easynomad.com'
        },
        token: user.tokens[0].token
    });
    expect(user.password).not.toBe('read123!');
     
});

test ('Should delete user account', async () => {    
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
    const user = await User.findById(userOneId);
    
    expect(user).toBeNull();
});

test ('Should log in existing user', async () => {
    const response = await request(app).post('/users/login')
        .send({
            email: userOne.email,
            password: userOne.password
        }).expect(200);
    const user = await User.findById(userOneId);
    expect(response.body.token).toBe(user.tokens[1].token);
});

test ('Should not log nonexisting user in', async () => {
    await request(app).post('/users/login')
        .send({
            email: 'noone@knowhere.org',
            password: 'someStupidPass!'
        }).expect(400);
});

test ('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});

test ('Should not get profile for unauthenicated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401);
});

test ('Should not delete unauthorized account', async () =>{
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401);
});

test ('Should upload image for avatar', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200);
    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer));
});

test ('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({name: 'George'})
        .expect(200);
    const user = await User.findById(userOneId);
    expect(user.name).toBe('George');
});

test ('Should throw error when trying to update an invalid user field', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({ location: 'Knowhere'})
        .expect(400);
});