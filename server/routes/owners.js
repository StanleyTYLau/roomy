const express = require('express');
const router = express.Router();


module.exports = (knex) => {
    
    router.get('/:id', (req, res) => {
        let placeInfo = {};
        let requestorList = [];

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
                console.log("requestors:", requestorList)
                res.send({placeInfo, requestorList});
            })
            
        })
    
    })

    return router;
}