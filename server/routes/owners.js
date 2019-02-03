const express = require('express');
const router = express.Router();


module.exports = (knex) => {
    router.get('/430', (req, res) => {
        knex('places').select('*')
        .where({ user_id: 58 })
        .then( (results) => {
            console.log(results[0]);
            res.send(results[0]);
        })
    })

    return router;
}