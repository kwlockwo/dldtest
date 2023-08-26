const express = require('express');
const axios = require('axios');
const { showhomepage, twitterpost } = require('./pagecontroller');
const app = express();
const path = require('path'); // Add this line to import the path module
const fs = require('fs');
const os = require('os');

const port = 3000;


app.set("view engine", "ejs");
app.use('/videos', express.static(path.join(__dirname, 'videos')));
// This helps in retriving user data same like body parser
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get('/', showhomepage)
app.post('/twitter', twitterpost)
app.get('/download/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, 'path/to/your/temporary/files', fileName); // Update the path accordingly

  res.download(filePath, (err) => {
      if (err) {
          console.error('Error while downloading file:', err);
          res.status(500).send('Error downloading file');
      }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
