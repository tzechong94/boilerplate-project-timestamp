// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", function (req, res) {
  const date_string = Date.now();
  const date = new Date(date_string);
  res.json({
    unix: date_string,
    utc: date.toString()
  })
})

app.get("/api/:date_string", function (req, res) {
  const date_string = req.params.date_string;
  if (date_string.includes("-")) {
    const date = new Date(date_string);
    const dateUnixValue = Date.parse(date_string);
    const dateUtcValue = date.toString();
    if (dateUtcValue === "Invalid Date"){
      res.json({
        error : "Invalid Date"
      })
    } else {
      res.json({
        unix: dateUnixValue,
        utc: dateUtcValue,
      })
    }
  } else {
    const date = new Date(parseInt(date_string))
    if (date.toString() === "Invalid Date"){
      res.json({
        error: "Invalid Date"
      })
    } else {
      res.json({
        unix: parseInt(date_string),
        utc: date.toString(),
        // utc: 
      })
    }
  }
})



// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
