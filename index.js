const express = require('express');
const axios = require('axios');
const { showhomepage, twitterpost } = require('./pagecontroller');
const app = express();

const port = 3000;


app.set("view engine", "ejs");
// This helps in retriving user data same like body parser
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get('/', showhomepage)
app.post('/twitter', twitterpost)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
