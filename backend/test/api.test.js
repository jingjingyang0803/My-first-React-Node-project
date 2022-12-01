const request = require('supertest');

const app = require('../src/app');

describe('GET /api/v1', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'API - 👋🌎🌍🌏'
      }, done);
  });
});

describe('GET /api/v1/emojis', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1/emojis')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, ['😀', '😳', '🙄'], done);
  });
});

describe('Endpoint /api/v1/tasks', () => {
  it('should respond with 200 when called with GET request', (done) => {
    request(app)
      .get('/api/v1/tasks')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('should return a list of tasks when called with GET', (done) => {
    const expected = [
      { id: 1, title: 'Shopping for presents', status: false },
      { id: 2, title: 'Write Christmas cards', status: false },
      { id: 3, title: 'Decorate', status: false }
    ];
    request(app)
      .get('/api/v1/tasks')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, expected, done);
  });

  it('should return the tasks when called with GET id', (done) => {
    const expected = { id: 3, title: 'Decorate', status: false };
    request(app)
      .get('/api/v1/tasks/3')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, expected, done);
  });

  it('should return 404 if nothing was found with the id', (done) => {
    request(app)
      .get('/api/v1/tasks/10')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, { message: 'Not found' }, done);
  });

  it('should return 201 when new task was added', async () => {
    await request(app)
      .post('/api/v1/tasks/')
      .set('Accept', 'application/json')
      .send({ id: 4, title: 'Order food' })
      .expect('Content-Type', /json/)
      .expect(201, { message: 'Created' });
    // Check that it was actually added as well
    const expected = { id: 4, title: 'Order food', status: false };
    await request(app)
      .get('/api/v1/tasks/4')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, expected);
  });


  it('should return 200 when task was updated', async () => {
    await request(app)
      .patch('/api/v1/tasks/3')
      .set('Accept', 'application/json')
      .send({ status: true })
      .expect('Content-Type', /json/)
      .expect(200, { message: 'Updated' });
    // Check that it was actually marked down as well
    const expected = {
      id: 3,
      title: 'Decorate',
      status: true
    };
    await request(app)
      .get('/api/v1/tasks/3')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, expected);
  });

  it('should return 200 when task was deleted', async () => {
    await request(app)
      .delete('/api/v1/tasks/2')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, { message: 'Deleted' });
    await request(app)
      .get('/api/v1/tasks/2')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, { message: 'Not found' });
  });
});

