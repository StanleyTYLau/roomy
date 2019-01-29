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

  return router;
}


function checkPassword (obj, str) {
  if (obj.password === str) {
    return true;
  } else {
    return false;
  }
}

