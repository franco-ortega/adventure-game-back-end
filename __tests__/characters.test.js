const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

describe('character routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });


  it('creates a new character via POST', async() => {
    const user = await UserService.create({
      username: 'Anna',
      email: 'Anna@test.com',
      password: 'password'
    });

    const res = await request(app)
      .post('/api/v1/characters')
      .send({
        characterName: 'Tarven',
        species: 'Elf',
        hitPoints: 30,
        gender: 'male',
        userId: user.id
      });

    expect(res.body).toEqual({
      id: expect.any(String),
      characterName: 'Tarven',
      species: 'Elf',
      hitPoints: 30,
      gender: 'male',
      userId: user.id
    });
  });
});
