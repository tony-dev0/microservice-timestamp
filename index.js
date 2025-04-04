// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", function (req, res) {
  const { date } = req.params;

  if (!date) {
    const currentTime = parseInt(Date.now());
    const utcdate = new Date(currentTime).toUTCString();
    return res.json({ unix: parseInt(currentTime), utc: utcdate });
  }

  if (/\d{5,}/.test(date)) {
    let dateInt = parseInt(date);

    return res.json({ unix: dateInt, utc: new Date(dateInt).toUTCString() });
  }
  let dateObject = new Date(date);

  if (dateObject.toString() === "Invalid Date")
    return res.json({ error: "Invalid Date" });

  res.json({
    unix: parseInt(dateObject.valueOf()),
    utc: dateObject.toUTCString(),
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 8000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
