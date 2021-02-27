module.exports = class User {
    id;
    characterName;
    species;
    hitPoints;
    gender;
    userId;

    constructor(row) {
      this.id = row.id;
      this.characterName = row.characterName;
      this.species = row.species;
      this.hitPoints = row.hitPoints;
      this.gender = row.gender;
      this.userId = row.userId;
    }
};
