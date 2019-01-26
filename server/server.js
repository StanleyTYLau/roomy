require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const ENV         = process.env.ENV || "development";
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const app = express();
const port = process.env.PORT || 5000;

//Seperate Routes for each Resource
const usersRoutes = require("./routes/users");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Mount all resource routes
app.use("/users", usersRoutes(knex));





app.listen(port, () => console.log(`Listening on port ${port}`));