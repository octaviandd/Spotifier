/** @format */

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const cookieParser = require("cookie-parser");
var cookieSession = require("cookie-session");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;
require("dotenv").config();

var client_id = process.env.CLIENT_ID;
var redirect_uri = process.env.REDIRECT_URI;
var client_secret = process.env.CLIENT_SECRET;
let refreshToken = "";

app.use(cookieParser());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/login", function (req, res) {
  var code = req.body.code || null;
  var state = req.body.state || null;

  console.log(code);

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
    res.cookie("access_token", data.access_token, {
      maxAge: data.expires_in * 1000,
    });
    res.json({
      response: response.body,
    });
  });
});

app.post("/token", function (req, res) {
  console.log("refresh hit");
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

app.post("/songs", function (res, req) {
  let token = req.body.token;
  var options = {
    method: "POST",
    url: "https://accounts.spotify.com/api/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    form: {
      grant_type: "refresh_token",
      refresh_token,
      client_id,
      client_secret,
    },
  };
});

app.listen(port, function () {
  console.log("App listening on port: " + port);
});
