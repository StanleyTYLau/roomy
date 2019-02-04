module.exports = {
  //compares users profiles and gives a % matching
  compareUsers: function (user1, user2) {
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

    return (finalScore / maxScore);
  }
};
