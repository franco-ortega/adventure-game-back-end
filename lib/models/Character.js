const pool = require('../utils/pool');

module.exports = class Character {
    id;
    characterName;
    species;
    hitPoints;
    gender;
    userId;

    constructor(row) {
      this.id = String(row.id);
      this.characterName = row.character_name;
      this.species = row.species;
      this.hitPoints = row.hit_points;
      this.gender = row.gender;
      this.userId = String(row.user_id);
    }

    static async insert({ characterName, species, hitPoints, gender, userId }) {
      const { rows } = await pool.query(
        'INSERT INTO characters (character_name, species, hit_points, gender, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [characterName, species, hitPoints, gender, userId]
      );

      return new Character(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM characters'
      );

      return rows.map(row => new Character(row));
    }
};
