/** @format */

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;
require("dotenv").config();

var client_id = process.env.CLIENT_ID;
var redirect_uri = process.env.REDIRECT_URI;
var client_secret = process.env.CLIENT_SECRET;

console.log(redirect_uri);

app.use(cookieParser());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.post("/login", function (req, res) {
  var code = req.body.code || null;
  var state = req.body.state || null;

  var options = {
    method: "POST",
    url: "https://accounts.spotify.com/api/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    form: {
      grant_type: "authorization_code",
      redirect_uri,
      code,
      client_id,
      client_secret,
    },
  };
  request.post(options, function (error, response, body) {
    if (error) throw new Error(error);
    let data = JSON.parse(body);
    res.cookie("refresh_token", data.refresh_token, {
      maxAge: 30 * 24 * 3600 * 1000,
    });
    // res.cookie("access_token", data.access_token, {
    //   maxAge: data.expires_in * 1000,
    // });
    res.json({
      response: response.body,
    });
  });
});

app.post("/token", function (req, res) {
  var refreshToken = req.body.refreshToken || null;
  if (refreshToken) {
    var options = {
      method: "POST",
      url: "https://accounts.spotify.com/api/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      form: {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id,
        client_secret,
      },
    };
    request.post(options, function (error, response) {
      if (!error && response.statusCode === 200) {
        res.setHeader("Content-Type", "application/json");
        res.json({
          response: response.body,
        });
      } else {
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify({ access_token: "", expires_in: "" }));
      }
    });
  } else {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({ access_token: "", expires_in: "" }));
  }
});

app.listen(port, function () {
  console.log("App listening on port: " + port);
});
