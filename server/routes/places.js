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

  //compares users profiles and gives a % matching
  function compareUsers(user1, user2) {
    let weight = {
      gender: 5,
      smoker: 5,
      pet_owner: 5,
      work_sched: 10,
      cleanliness: 10,
      go_out_freq: 5,
      guests_freq: 5,
      hobbies: 20,
      diet: 5,
      personality: 10
    }
    let scores = [];
    let finalScore = 0;

    //Calculate weighted score for attributes that should match 1:1
    function _score1To1(attr1, attr2, attrWeight){
      if(attr1 === attr2){
        scores.push(1 * attrWeight);
      }
      else {
        scores.push(0);
      }
    }

    //Calculate weighted score for attributes that have 3 options low, medium, high
    function _score3(attr1, attr2, attrWeight){
      if(attr1 === attr2){
        scores.push(1 * attrWeight);
      }
      else {
        scores.push(0);
      }
    }

    //go thru profile attributes
      //compare each attribute
      //provide % match for the attribute
      //get weighted score for the attribute
    _score1To1(user1.gender, user2.gender, weight.gender);
    _score1To1(user1.smoker, user2.smoker, weight.smoker);
    _score1To1(user1.pets, user2.pets, weight.pet_owner);
    _score1To1(user1.work_sched, user2.work_sched, weight.work_sched);
   
  
   
  
    switch (_convertToNum(user1.cleanliness) - _convertToNum(user2.cleanliness)){
      case 0:
        scores.push(1 * weight.cleanliness)
        break;
      case 1:
        scores.push(0.5 * weight.cleanliness)
        break;
      case 2:
        scores.push(0 * weight.cleanliness)
        break;
      default:
        return Error("Err on weighted scores calc")
    }
    switch (_convertToNum(user1.go_out_freq) - _convertToNum(user2.go_out_freq)){
      case 0:
        scores.push(1 * weight.go_out_freq)
        break;
      case 1:
        scores.push(0.5 * weight.go_out_freq)
        break;
      case 2:
        scores.push(0 * weight.go_out_freq)
        break;
      default:
        return Error("Err on weighted scores calc")
    }
    switch (_convertToNum(user1.guests_freq) - _convertToNum(user2.guests_freq)){
      case 0:
        scores.push(1 * weight.guests_freq)
        break;
      case 1:
        scores.push(0.5 * weight.guests_freq)
        break;
      case 2:
        scores.push(0 * weight.guests_freq)
        break;
      default:
        return Error("Err on weighted scores calc")
    }
    if (user1.diet === user2.diet){
      scores.push(1 * weight.diet)
    }
    if (user1.personality === user2.personality){
      scores.push(1 * weight.personality)
    }
    scores.push(_scoreHobbies(user1.hobbies, user2.hobbies) * weight.hobbies);

    //total all weighted scores for all attributes
    scores.forEach((score) => {
      finalScore += score;
    })

    return finalScore;
  }

  //take array of hobbies from 2 users and calc % matching
  function _scoreHobbies(user1, user2){
    const total = user1.length;
    let matches = 0;

    user1.forEach( hobby1 => {
      if (user2.indexOf(hobby1) >= 0){
        matches++;
      }
    })

    return (matches / total);
  }

  function _convertToNum(rank) {
    switch (rank.toLowerCase()){
      case "low":
        return 0;
        break;
      case "medium":
        return 1;
        break;
      case "high":
        return 2;
        break;
      default:
        return Error("Err: convert ranking to number"); 
    }
  }

  return router;
}



