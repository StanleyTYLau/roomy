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
    console.log(req.body);

    let email = req.body.login.email;
    let password = req.body.login.password;
    
    console.log(email);
		knex.select('first_name')
			.from('users')
			.where({
        email: email,
        password: password
      })
			.then( (results) => {
        console.log(results);
        res.send(results);
				
          });
        })

  return router;
}
