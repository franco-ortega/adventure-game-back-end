const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

describe('user routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  it('creates a new user via POST', async() => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({
        username: 'Santiago',
        email: 'santiago@test.com'
      });

    expect(res.body).toEqual({
      id: expect.any(String),
      username: 'Santiago',
      email: 'santiago@test.com'
    });
  });
});
