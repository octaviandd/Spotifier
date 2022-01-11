/** @format */

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;
require("dotenv").config();

let frontend_uri = "http://localhost:8080";
var client_id = process.env.CLIENT_ID;
var redirect_uri = process.env.REDIRECT_URI;
var client_secret = process.env.CLIENT_SECRET;

const generateRandomString = function (length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
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
      Cookie:
        "__Host-device_id=AQCMZFCyJEW6hUyqlegNxubysC8dO3DjIpOndHtPYiOjvcyZNARoNXf1eVBTdK_U2KSTbEZKgzZT0q-odo1MvgMazAMITHexXow; sp_tr=false",
    },
    form: {
      grant_type: "authorization_code",
      redirect_uri: "http://localhost:8080/profile",
      code: code,
      client_id: "c80dc2ae16884491b82fca219719f0c4",
      client_secret: "f41e617c5d9a4180b93d9073d8510811",
    },
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
});

app.listen(port, function () {
  console.log("App listening on port: " + port);
});
