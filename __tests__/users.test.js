const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

describe('user routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  it('signs up a new user via POST', async() => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'Santiago',
        email: 'santiago@test.com',
        password: 'password'
      });

    expect(res.body).toEqual({
      id: expect.any(String),
      username: 'Santiago',
      email: 'santiago@test.com'
    });
  });

  it('logs in a user via POST', async() => {
    const user = await UserService.create({
      username: 'Santiago',
      email: 'Santiago@test.com',
      password: 'password'
    });

    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'Santiago@test.com',
        password: 'password'
      });

    expect(res.body).toEqual({
      id: user.id,
      username: 'Santiago',
      email: 'Santiago@test.com'
    });
  });
});
