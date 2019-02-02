const express = require('express');
const router = express.Router();


module.exports = (knex) => {

    router.get('/', (req, res) => {
        knex('places')
        .select('*')
        //.where({ user_id: req.params.id })
        .then( (results) => {
            console.log(results);
            res.send(results);
        })
    });

    return router;
}
