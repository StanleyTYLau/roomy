const express = require('express');
const router = express.Router();

module.exports = (knex) => {
  router.get('/', (req, res) => {
    knex.select('*')
      .from('places')
      .orderBy('id')
      .then( (results) => {
        res.send(results);
      });
  });

  //Route for a user to request a roommate at a place => add user to requestor table
  router.put('/:id', (req, res) => {
    
    const current_user = req.body.user_info;
    const requestorData = {
      placeid: req.params.id,
      userid: current_user.id
    };

    knex('requestors')
    .select('*')
    .where({
      userid: requestorData.userid,
      placeid: requestorData.placeid
    })
    .then((result) => {
      if (result.length === 0) {
        console.log("Requestor not in list, adding now:", requestorData);
        knex('requestors')
        .insert(requestorData)
        .returning('*')
        .then( (results) => {
          res.send(results[0]);
        });
      }
      else{
        console.log('Req already in list', result);
        res.send("Requestor already in list");
      }
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
      parking: req.body.newPlace.parking,
      lat: req.body.newPlace.lat,
      lng: req.body.newPlace.lng
    }

    console.log(newPlace)

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
             parking: newPlace.parking,
             lat: newPlace.lat,
             lng: newPlace.lng
    })
    .then ( () => {
      console.log("Succesfully inserted data to places");
    });



  });

  //work-around to send user data. Using POST instead of GET
  router.post('/place_id/:id', (req, res) =>{
   
    let owner = {};
    let current_user = req.body.user_info;
    let place = {};
    //get the place w/ params.id and get the corresponding place owner profile
    //SELECT * FROM places JOIN users ON users.id=places.user_id;
    knex.select('*')
      .from('places')
      .where('id', req.params.id)
      .then( (results) => {
        place = results[0]; 
        knex.select('*')
        .where('id', results[0].user_id)
        .from('users')
        .then((result) => {
          owner = result[0];
          //console.log("PLACE ID: ", req.params.id)
          //console.log("Owner data:", owner);
          //console.log("CURR data:", current_user);
          place['matchPercent'] = compareUsers(current_user, owner);
          //console.log("MATCH:", place['matchPercent'])
          res.send({place, owner});
        })
              
      })
    
  });

  // async function getUserInfo(id) {
  //   const info = await knex('users').select('*').where('id', id).returning('*');
  //   return info;
  // }

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
      hobbies: 0,
      diet: 5,
      personality: 10
    }
    let maxScore = 0;
    for (i in weight){
      maxScore += weight[i];
    }
    let scores = [];
    let finalScore = 0;
    console.log("Comparing:", user1, user2);
    //Calculate weighted score for attributes that should match 1:1
    function _score1To1(user1, user2, attrName){
      if(String(user1[attrName]).toLowerCase() === String(user2[attrName]).toLowerCase()){
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
      if (user1 && user2) {
        const total = user1.length;
        let matches = 0;

        user1.forEach( hobby1 => {
          if (user2.indexOf(hobby1) >= 0){
            matches++;
          }
        })
        return (matches / total);
      }
      else {
        return 0;
      }
      
    }

    function _convertToNum(rank) {
      switch (rank.toLowerCase()){
        case "low":
          return 0;
          break;
        case "moderate":
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
    _score3(user1, user2, 'guest_freq', weight.guests_freq);
  
    scores.push(_scoreHobbies(user1.hobbies, user2.hobbies) * weight.hobbies);

    //total all weighted scores for all attributes
    scores.forEach((score) => {
      finalScore += score;
    })
    //console.log("Matching scores:", scores);
    //console.log("max scores:", maxScore);

    return Math.round((finalScore / maxScore) * 100);
  }


  router.post('/search', (req, res) => {
    // console.log(req.body);

    let searchQuery = {
      neighbourhood: req.body.query.neighbourhood,
      type_of_building: req.body.query.buildingType,
      parking: req.body.query.parking,
      laundry: req.body.query.laundry,
      air_condition: req.body.query.ac,
      furnished: req.body.query.furnished
    }

    let priceRange = {
      monthlyPriceFrom: req.body.query.monthlyPriceFrom,
      monthlyPriceTo: req.body.query.monthlyPriceTo,
    }


    let dbSearch = {};
    for (queryParam in searchQuery) {
      // console.log(searchQuery[queryParam]);
      if (searchQuery[queryParam] !== '') {
        dbSearch[queryParam] = searchQuery[queryParam];
      }
      
    }
    
    console.log(dbSearch);

    if (priceRange.monthlyPriceFrom !== '' && priceRange.monthlyPriceTo !== '') {
      
      knex
      .from('places')
      .where(
        dbSearch
      )
      .andWhere(function() {
        this.where('price', '>', priceRange.monthlyPriceFrom)
      })
      .andWhere(function() {
        this.where('price', '<', priceRange.monthlyPriceTo)
      })
      .select('*')
      .orderBy('id')
      .then( (results) => {
        console.log(results);
        res.send(results);
      })
    } else if (priceRange.monthlyPriceFrom !== '' && priceRange.monthlyPriceTo === '') {
      knex
      .from('places')
      .where(
        dbSearch
      )
      .andWhere(function() {
        this.where('price', '>', priceRange.monthlyPriceFrom)
      })
      .select('*')
      .orderBy('id')
      .then( (results) => {
        console.log(results);
        res.send(results);
      })
    } else if (priceRange.monthlyPriceFrom === '' && priceRange.monthlyPriceTo !== '') {
      knex
      .from('places')
      .where(
        dbSearch
      )
      .andWhere(function() {
        this.where('price', '<', priceRange.monthlyPriceTo)
      })
      .select('*')
      .orderBy('id')
      .then( (results) => {
        console.log(results);
        res.send(results);
      })
    } else {
      knex
      .from('places')
      .where(
        dbSearch
      )
      .select('*')
      .orderBy('id')
      .then( (results) => {
        console.log(results);
        res.send(results);
      })
    }

  })


    


  

  return router;
}

