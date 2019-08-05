const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');

const { userOneId, userOne, userTwoId, userTwo, taskOne, setupDb } = require('./fixtures/db');

beforeEach(setupDb);

test ('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'From my test'
        })
        .expect(201);
    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
    expect(task.completed).toBe(false);
});

test ('Should return the correct number of task for the first user', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
    expect(response.body.length).toBe(2);
});

test ('Should not delete anothers task', async () => {
    const response = await request(app)
        .delete('/tasks/' + taskOne._id)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404);

    const res = await Task.findById(taskOne._id);
    expect(res).not.toBeNull();
})