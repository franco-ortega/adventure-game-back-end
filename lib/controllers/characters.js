const { Router } = require('express');
const Character = require('../models/Character');

module.exports = Router()
  .post('/', (req, res, next) => {
    Character
      .insert(req.body)
      .then(character => res.send(character))
      .catch(next);
  })
  
  .get('/', (req, res, next) => {
    Character
      .find()
      .then(characters => res.send(characters))
      .catch(next);
  });
