const express = require('express');   


const { showhomepage, twitterpost ,downloadVideo} = require('./pagecontroller');
const app = express();


const port = 3000;


app.set("view engine", "ejs");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get('/', showhomepage)
app.post('/twitter', twitterpost)
app.post('/download', downloadVideo)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
