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
            res.status(200).send(results[0]);
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
      firstName: req.body.newUser.firstName,
      lastName: req.body.newUser.lastName,
      email: req.body.newUser.email,
      password: req.body.newUser.password,
      gender: req.body.newUser.gender,
      cleanliness: req.body.newUser.cleanliness,
      smoker: req.body.newUser.smoker,
      pets: req.body.newUser.pets,
      type: req.body.newUser.type,
      workSched: req.body.newUser.workSched,
      goOutFreq: req.body.newUser.goOutFreq,
      guestsFreq: req.body.newUser.guestsFreq,
      diet: req.body.newUser.diet,
      personality: req.body.newUser.personality
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
             type: newUser.type,
             work_sched: newUser.workSched,
             go_out_freq: newUser.goOutFreq,
             guest_freq: newUser.guestsFreq,
             diet: newUser.diet,
             personality: newUser.personality
            })
    .then( (results) => {
      res.send(results);
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

