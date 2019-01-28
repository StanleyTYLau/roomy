const express = require('express');
const router = express.Router();

module.exports = (knex) => {
  router.get('/', (req, res) => {
    knex.select('*')
      .from('users')
      .then( (results) => {
        console.log("get user tset:", results);
        res.send(results);
      });
  });

  router.post('/', function(req, res, next) {
    res.locals.connection.query("INSERT INTO users(firstName,lastName) values(''+req.body.firstName+'',''+req.body.lastName+''"), function (error, results, fields) {
        if(error) throw error;
        res.send(results);
    };
});

  return router;
}
