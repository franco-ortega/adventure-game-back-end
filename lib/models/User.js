const pool = require('../utils/pool');
const Character = require('./Character');

module.exports = class User {
    id;
    username;
    email;
    passwordHash;

    constructor(row) {
      this.id = row.id;
      this.username = row.username;
      this.email = row.email;
      this.passwordHash = row.password_hash;
    }

    static async insert({ username, email, passwordHash }) {
      const { rows } = await pool.query(
        'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
        [username, email, passwordHash]
      );

      return new User(rows[0]);
    }

    static async findByEmail(email) {
      const { rows } = await pool.query(
        'SELECT * FROM users WHERE email=$1',
        [email]
      );

      if(!rows[0]) throw new Error(`No user with email ${email} found.`);
      return new User(rows[0]);
    }

    static async findByUsername(username) {
      const { rows } = await pool.query(
        'SELECT * FROM users WHERE username=$1',
        [username]
      );

      if(!rows[0]) throw new Error(`No user with username ${username} found.`);
      return new User(rows[0]);
    }

    static async findById(id) {
      const { rows } = await pool.query(
        `SELECT
          users.*,
          array_to_json(array_agg(characters.*)) AS characters
        FROM
          users
        JOIN
          characters
        ON users.id = characters.user_id
        WHERE users.id=$1
        GROUP BY users.id
        `,
        [id]
      );

      if(!rows[0]) throw new Error(`No user with id ${id} found.`);
      return {
        ...new User(rows[0]),
        characters: rows[0].characters.map(character => new Character(character))
      };
    }

    toJSON() {
      const json = { ...this };
      delete json.passwordHash;
      return json;
    }
};
