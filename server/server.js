require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const ENV         = process.env.ENV || "development";
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);

  let test = "";
  knex.select('*')
    .from('users')
    .then( rows => {
      test = rows;
      console.log(rows);
      res.send(
        `${test[0].username}I received your POST request. This is what you sent me: ${req.body.post}`,
      );
    });

  
});

app.listen(port, () => console.log(`Listening on port ${port}`));