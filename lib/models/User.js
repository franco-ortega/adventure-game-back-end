const pool = require("../utils/pool");

module.exports = class User {
    id;
    name;
    email;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.email = row.email;
    }

    static async insert({ name, email }) {
      const { rows } = await pool.query(
        'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
        [name, email]
      );

      return new User(rows[0]);
    }
};
