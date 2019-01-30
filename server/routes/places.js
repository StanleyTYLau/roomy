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
    dummyId = 10;//grab data from req.body current user
    let user1 = {};
    let user2 = {};
    //get the place w/ params.id and get the corresponding place owner profile
    //SELECT * FROM places JOIN users ON users.id=places.user_id;
    knex.select('user_id')
      .from('places')
      .where('id', req.params.id)
      .then( (results) => {
        getUserInfo(results[0].user_id)
        .then((results) => {
          console.log(results);
          user1 = results;

          //get current user profile
          getUserInfo(dummyId)
          .then((results) => {
            user2 = results
            res.send([user1, user2]);

            // [{"id":8,"first_name":"Alex","last_name":"Peterson","email":"alex@email.com","password":"password1","gender":"male","smoker":false,"pets":false,"cleanliness":"High","type":"roomy"}]
            // [{"id":10,"first_name":"Math","last_name":"Murdock","email":"math@email.com","password":"password3","gender":"male","smoker":true,"pets":true,"cleanliness":"Low","type":"roomy"}]
          })
          
        });


        
      })
    
    //compare mathcing %
  });

  async function getUserInfo(id) {
    const info = await knex('users').select('*').where('id', id).returning('*');
    return info;
  }

  function compareUsers(user1, user2) {
    
  }

  return router;
}



