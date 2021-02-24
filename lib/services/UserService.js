const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = class UserService {
  static async create({ email, password }) {
    const passwordHash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    const user = await User.insert({ email, passwordHash });
    return user;
  }

  static async authorize({ email, password }) {
    try {
      const user = await User.findByEmail(email);

      const passwordsMatch = await bcrypt.compare(password, user.passwordHash);
      if(!passwordsMatch) throw new Error('Invalid password.');
      return user;
    } catch(err) {
      err.status = 401;
      throw err;
    }
  }
};
