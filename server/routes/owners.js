
const matching = require('./matching/matchingCalc.js');
const express  = require('express');
const router   = express.Router();
const mailgunConfig = require('./config');
const mailgun = require('mailgun-js')({apiKey: mailgunConfig.api_key, domain: mailgunConfig.domain});




module.exports = (knex) => {

    router.get('/:id', (req, res) => {
        let placeInfo = {};
        let requestorList = [];
        let ownerData = {};

        knex('places').select('*')
        .where({ user_id: req.params.id })
        .then( (results) => {
            console.log("place data:", results[0]);
            placeInfo = results[0];
            console.log("looking for userId:", req.params.id);
            console.log("looking for placeId:", placeInfo.id);

            knex('requestors')
            .select('*')
            .where({placeid: placeInfo.id})
            .then((requestors) => {
                requestorList = requestors;     

                knex('users')
                .select('*')
                .where({id: req.params.id})
                .then((owner) => {
                    ownerData = owner[0];

                    //Iterate thru requestors, calc match%, append to requestorList
                    Promise.all(requestorList.map((requestor, index) => {
                        return knex('users')
                        .select('*')
                        .where({id: requestor.userid})
                        .then((res) => {
                            //console.log("owner data:", ownerData);
                            //console.log("requestor data:", res[0]);
                            let match = matching.compareUsers(ownerData,res[0]);
                            //console.log("Match Percent:", match);
                            
                            requestorList[index]["matchPercent"] = match;
                            requestorList[index]["first_name"] = res[0].first_name;
                            requestorList[index]["last_name"] = res[0].last_name;
                            requestorList[index]["gender"] = res[0].gender;
                            requestorList[index]["smoker"] = res[0].smoker;
                            requestorList[index]["pets"] = res[0].pets;
                            requestorList[index]["cleanliness"] = res[0].cleanliness;
                            requestorList[index]["work_sched"] = res[0].work_sched;
                            requestorList[index]["go_out_freq"] = res[0].go_out_freq;
                            requestorList[index]["guest_freq"] = res[0].guest_freq;
                            requestorList[index]["hobbies"] = res[0].hobbies;
                            requestorList[index]["diet"] = res[0].diet;
                            requestorList[index]["personality"] = res[0].personality;
                            requestorList[index]["picture_url"] = res[0].picture_url;

                            //console.log("list index: ", requestorList[index]);
                        })
                    }))
                    .then(() => {
                        //console.log("requestors!!!:", requestorList)
                        requestorList = requestorList.sort((a, b) => b.matchPercent - a.matchPercent);
                        res.send({placeInfo, requestorList});
                    })
                    
                })
                
            })
                        
        })
           
    })

    //Route for owner to accept or decline a requestor
    router.put('/:id', (req, res) => {
        var owner = {
            name: req.body.ownerData.first_name,
            email: req.body.ownerData.email
        }
        var recipient = req.body.requestor.first_name;
        var place = {
            postal_code: req.body.placeData.postal_code,
            street_number: req.body.placeData.street_number,
            stree_name: req.body.placeData.street_name,
            neighbourhood: req.body.placeData.neighbourhood
        }

        knex('requestors')
        .where({
            placeid: req.body.placeData.id,
            userid: req.body.requestorId
        })
        .update({
            accepted: req.body.ownerAnswer
        })
        .then(() => {
            var data = {
                from: 'okatiukha@gmail.com',
                to: 'al.katuha@gmail.com',
                subject: 'Roomy application',
                text: `Hi ${recipient}! Your roomy applicaion for ${place.postal_code} ${place.street_number} ${place.street_name} in ${place.neighbourhood} has been approved by ${owner.name}! Please contact the owner via email ${owner.email}`
            };
            mailgun.messages().send(data, function (err, body) {
                if (err) {
                    
                    console.log("got an error: ", err);
                }
        
                else {
                    
                    console.log(body);
                }
            });
            
            res.send('Owner Responded to Requestor');

            

        })
    })






    return router;
}