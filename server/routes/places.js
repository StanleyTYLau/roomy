const express = require('express');
const router = express.Router();

module.exports = (knex) => {
  router.get('/', (req, res) => {
    knex.select('*')
      .from('places')
      .then( (results) => {
        console.log(results);
        res.send(results);
      });
  });

  router.get('/:id', (req, res) =>{
    //get the place w/ params.id
    //get the corresponding place owner profile
    //get currebt user profile
    //compare mathcing %
  });

  return router;
}