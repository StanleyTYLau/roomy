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
    //DUmmy users
    const profile1 = {
      gender: 'male',
      smoker: false,
      pets: true,
      work_sched: 'day',
      cleanliness: 'medium',
      go_out_freq: 'high',
      guests_freq: 'low',
      hobbies: ['Reading', 'Video Games'],
      diet: 'none',
      personality: 'introvert'
    }
    const profile2 = {
      gender: 'male',
      smoker: false,
      pets: true,
      work_sched: 'day',
      cleanliness: 'medium',
      go_out_freq: 'high',
      guests_freq: 'low',
      hobbies: ['Reading', 'Video Games'],
      diet: 'none',
      personality: 'introvert'
    }

    let user1 = {};
    let user2 = {};
    let place = {};
    //get the place w/ params.id and get the corresponding place owner profile
    //SELECT * FROM places JOIN users ON users.id=places.user_id;
    knex.select('*')
      .from('places')
      .where('id', req.params.id)
      .then( (results) => {
        place = results[0];
        getUserInfo(results[0].user_id)
        .then((owner) => {
          user1 = owner;

          //get current user profile
          getUserInfo(dummyId)
          .then((currentUser) => {
            user2 = currentUser
            //compare mathcing %
            console.log("Matching %:", compareUsers(profile1, profile2));
            place['matchPercent'] = compareUsers(profile1, profile2);
            res.send(place);

            // [{"id":8,"first_name":"Alex","last_name":"Peterson","email":"alex@email.com","password":"password1","gender":"male","smoker":false,"pets":false,"cleanliness":"High","type":"roomy"}]
            // [{"id":10,"first_name":"Math","last_name":"Murdock","email":"math@email.com","password":"password3","gender":"male","smoker":true,"pets":true,"cleanliness":"Low","type":"roomy"}]
          })
          
        });


        
      })
    
    
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
      pets: 5,
      work_sched: 10,
      cleanliness: 10,
      go_out_freq: 5,
      guests_freq: 5,
      hobbies: 20,
      diet: 5,
      personality: 10
    }
    let maxScore = 0;
    for (i in weight){
      maxScore += weight[i];
    }
    let scores = [];
    let finalScore = 0;

    //Calculate weighted score for attributes that should match 1:1
    function _score1To1(user1, user2, attrName){
      if(user1[attrName] === user2[attrName]){
        scores.push(1 * weight[attrName]);
      }
      else {
        scores.push(0);
      }
    }

    //Calculate weighted score for attributes that have 3 options low, medium, high
    function _score3(user1, user2, attrName, attrWeight){
      let user1_attr = _convertToNum(user1[attrName]);
      let user2_attr = _convertToNum(user2[attrName]);
      
      switch (user1_attr - user2_attr){
        case 0:
          scores.push(1 * attrWeight);
          break;
        case 1:
          scores.push(0.5 * attrWeight)
          break;
        case 2:
          scores.push(0 * attrWeight)
          break;
        default:
          return Error("Err on weighted scores calc")
      }
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

    //go thru profile attributes
      //compare each attribute
      //provide % match for the attribute
      //get weighted score for the attribute
    _score1To1(user1, user2, 'gender');
    _score1To1(user1, user2, 'smoker');
    _score1To1(user1, user2, 'pets');
    _score1To1(user1, user2, 'work_sched');
    _score1To1(user1, user2, 'diet');
    _score1To1(user1, user2, 'personality');
    _score3(user1, user2, 'cleanliness', weight.cleanliness);
    _score3(user1, user2, 'go_out_freq', weight.go_out_freq);
    _score3(user1, user2, 'guests_freq', weight.guests_freq);
  
    scores.push(_scoreHobbies(user1.hobbies, user2.hobbies) * weight.hobbies);

    //total all weighted scores for all attributes
    scores.forEach((score) => {
      finalScore += score;
    })
    console.log("Matching scores:", scores);
    console.log("max scores:", maxScore);

    return (finalScore / maxScore);
  }



  

  return router;
}



