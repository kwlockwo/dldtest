const express = require('express');   
// Import the path module
const path = require('path');


const { showhomepage, twitterpost ,downloadVideo} = require('./pagecontroller');
const app = express();


const port = 3000;


app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, 'views'));




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
