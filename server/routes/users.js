const express = require('express');
const router = express.Router();

module.exports = (knex) => {
  router.get('/', (req, res) => {
    knex.select('*')
      .from('users')
      .then( (results) => {
        console.log("get user test:", results);
        res.send(results);
      });
  });


  router.post('/login', (req, res) => {

    let email = req.body.login.email;
    let password = req.body.login.password;
    
		knex.select('*')
			.from('users')
			.where({
        email: email
      })
			.then( (results) => {
        if (results.length != 0) {
          let result = results[0];
          if (checkPassword(result, password)) {
            res.sendStatus(200);
          } else {
            res.sendStatus(403);
          }
        } else {
          res.sendStatus(401)
        }
      })
    });

    router.post('/register', (req, res) => {
      
    let newUser = {
      firstName: req.body.user.firstName,
      lastName: req.body.user.lastName,
      email: req.body.user.email,
      password: req.body.user.password,
      gender: req.body.user.gender,
      cleanliness: req.body.user.cleanliness,
      smoker: req.body.user.smoker,
      pets: req.body.user.pets,
      type: req.body.user.type
    }

    console.log(newUser);    
    
    knex('users')
    .insert({first_name: newUser.firstName,
             last_name: newUser.lastName,
             email: newUser.email,
             password: newUser.password,
             gender: newUser.gender,
             cleanliness: newUser.cleanliness,
             smoker: newUser.smoker,
             pets: newUser.pets,
             type: newUser.type})
    .then( () => {
      console.log("Successfully inserted to Users");
    });
    });




  return router;
}


function checkPassword (obj, str) {
  if (obj.password === str) {
    return true;
  } else {
    return false;
  }
}

