module.exports = class User {
    id;
    name;
    email;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.email = row.email;
    }
}