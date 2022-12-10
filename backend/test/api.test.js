const request = require('supertest');

const app = require('../src/app');


it('should return a list of tasks when called with GET', (done) => {
    const expected = [
        { id: 1, name: 'Shopping for presents', done: false },
        { id: 2, name: 'Write Christmas cards', done: false },
        { id: 3, name: 'Decorate', done: false }
    ];
    request(app)
        .get('/api/v1/tasks')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, expected, done);
});

// it('should return the tasks when called with GET id', (done) => {
//     const expected = { id: 3, name: 'Decorate', done: false };
//     request(app)
//         .get('/api/v1/tasks/3')
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200, expected, done);
// });

// it('should return 404 if nothing was found with the id', (done) => {
//     request(app)
//         .get('/api/v1/tasks/10')
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(404, { message: 'Not found' }, done);
// });

it('should return 200 with new list when a new task was added', () => {
    const expected = [
        { id: 1, name: 'Shopping for presents', done: false },
        { id: 2, name: 'Write Christmas cards', done: false },
        { id: 3, name: 'Decorate', done: false },
        { id: 4, name: 'Order food', done: false }];
    request(app)
        .post('/api/v1/tasks')
        .set('Accept', 'application/json')
        .send({ id: 4, name: 'Order food', done: false })
        .expect('Content-Type', /json/)
        .expect(200, expected);
});


it('should return 200 with updated list when one task was marked done', () => {
    const expected = [
        { id: 1, name: 'Shopping for presents', done: false },
        { id: 2, name: 'Write Christmas cards', done: false },
        { id: 3, name: 'Decorate', done: true },
        { id: 4, name: 'Order food', done: false }];
    request(app)
        .patch('/api/v1/tasks/3')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, expected);
});

it('should return 200 with updated list when one task was deleted', () => {
    const expected = [
        { id: 1, name: 'Shopping for presents', done: false },
        { id: 3, name: 'Decorate', done: true },
        { id: 4, name: 'Order food', done: false }];
    request(app)
        .delete('/api/v1/tasks/2')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, expected);
});

it('should return 200 with updated list when all tasks were marked done', () => {
    const expected = [
        { id: 1, name: 'Shopping for presents', done: true },
        { id: 3, name: 'Decorate', done: true },
        { id: 4, name: 'Order food', done: true }];
    request(app)
        .delete('/api/v1/tasks/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, expected);
});

it('should return 200 with updated list when all completed tasks were removed', () => {
    const expected = [];
    request(app)
        .delete('/api/v1/tasks/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, expected);
});
