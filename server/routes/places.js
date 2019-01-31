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


  router.post('/new', (req, res) => {
    console.log(req.body);

    let newPlace = {
      postalCode: req.body.newPlace.postalCode,
      streetNumber: req.body.newPlace.streetNumber,
      streetName: req.body.newPlace.streetName,
      unitNumber: req.body.newPlace.unitNumber,
      neighbourhood: req.body.newPlace.neighbourhood,
      buildingType: req.body.newPlace.buildingType,
      price: req.body.newPlace.price,
      description: req.body.newPlace.description,
      bathrooms: req.body.newPlace.bathrooms,
      laundry: req.body.newPlace.laundry,
      furnished: req.body.newPlace.furnished,
      ac: req.body.newPlace.ac,
      parking: req.body.newPlace.parking
    }

    knex('places')
    .insert({postal_code: newPlace.postalCode,
             street_number: newPlace.streetNumber,
             street_name: newPlace.streetName,
             unit_number: newPlace.unitNumber,
             city: 'Toronto',
             price: newPlace.price,
             number_of_bathrooms: newPlace.bathrooms,
             neighbourhood: newPlace.neighbourhood,
             type_of_building: newPlace.buildingType,
             description: newPlace.description,
             laundry: newPlace.laundry,
             furnished: newPlace.furnished,
             air_condition: newPlace.ac,
             parking: newPlace.parking 
    })
    .then ( () => {
      console.log("Succesfully inserted data to places");
    });



  });

  return router;
}