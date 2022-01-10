/** @format */

const express = require("express");
const app = express();
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
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/login", function (req, res) {
  var state = generateRandomString(16);
  const scope =
    "user-read-private user-read-email user-read-playback-state user-top-read user-read-recently-played user-follow-read user-library-read";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      new URLSearchParams({
        response_type: "code",
        client_id,
        scope,
        redirect_uri,
        state,
        show_dialog: true,
      })
  );
});

app.get("/callback", function (req, res) {
  console.log("testtt");
  var code = req.query.code || null;
  var state = req.query.state || null;

  if (state === null) {
    res.redirect(
      "/#" +
        new URLSearchParams({
          error: "state_mismatch",
        })
    );
  } else {
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };
  }
});

app.listen(port, function () {
  console.log("App listening on port: " + port);
});
