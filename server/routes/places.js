const express = require('express');
const router = express.Router();

module.exports = (knex) => {
  router.get('/', (req, res) => {
    knex.select('*')
      .from('places')
      .then( (results) => {
        console.log("get user tset:", results);
        res.send(results);
      });
  });


router.connect((err, db, done) => {
  if(err) {
    return response.status(400).send(err);
  }
  else {
    db.query('INSERT INTO places (postal_code, street_number, street_name, unit_number, province, city, price, type, number_of_bathrooms') VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)', [postal_code, street_number, street_name, unit_number, province, city, price, type, number_of_bathrooms], (err, table) => {
    done();
      if(err) {
        return response.status(400).send(err);
      }
      else {
        console.log('DATA INSERTED');
        db.end();
        response.status(201).send({message: "data inserted"});
      }
    }
  }

  return router;
}