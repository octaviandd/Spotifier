/** @format */

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const cookieParser = require("cookie-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;
require("dotenv").config();

var client_id = process.env.CLIENT_ID;
var redirect_uri = process.env.REDIRECT_URI;
var client_secret = process.env.CLIENT_SECRET;
var JWT_SECRET = "cheese";

console.log(redirect_uri);

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
  var code = req.body.data.code || null;
  var state = req.body.data.state || null;

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
  request(options, function (error, response) {
    if (error) throw new Error(error);
    let data = JSON.parse(response.body);
    console.log({ data });
    res.cookie("token", data.access_token, {
      maxAge: data.expires_in,
      secure: true,
    });
    res.json({
      response: response.body,
    });
  });
});

app.post("/refresh", function (req, res) {
  var refresh_token = req.body.refresh_token || null;
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
  request(options, function (error, response) {
    if (error) throw new Error(error);
    let access_token = response.body.access_token;
    res.send({
      access_token: access_token,
    });
  });
});

app.listen(port, function () {
  console.log("App listening on port: " + port);
});
