const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
// const UserService = require('../lib/services/UserService');
const User = require('../lib/models/User');
const Character = require('../lib/models/Character');

describe('auth routes', () => {
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
        email: 'santiago@test.com',
        passwordHash: 'password'
      });

    expect(res.body).toEqual({
      id: expect.any(String),
      username: 'Santiago',
      email: 'santiago@test.com'
    });
  });

  it('get one user via GET', async() => {
    const user = await User.insert({
      username: 'Santiago',
      email: 'santiago@test.com',
      passwordHash: 'password'
    });

    const characters = await Promise.all([
      {
        characterName: 'Tarven',
        species: 'Elf',
        hitPoints: 30,
        gender: 'male',
        userId: user.id
      },
      {
        characterName: 'Sheila',
        species: 'Human',
        hitPoints: 30,
        gender: 'female',
        userId: user.id
      },
      {
        characterName: 'Helga',
        species: 'Dwarf',
        hitPoints: 30,
        gender: 'female',
        userId: user.id
      }

    ].map(character => Character.insert(character)));

    const res = await request(app)
      .get(`/api/v1/users/${user.id}`);

    expect(res.body).toEqual({
      ...user,
      characters: expect.arrayContaining(characters)
    });
  });
});
