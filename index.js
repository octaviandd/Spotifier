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
var Cookies = require("cookies");
const history = require("connect-history-api-fallback");

var client_id = process.env.CLIENT_ID;
var redirect_uri = process.env.REDIRECT_URI;
var client_secret = process.env.CLIENT_SECRET;

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

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app
  .use(express.static(path.resolve(__dirname, "client/build")))
  .use(cors())
  .use(cookieParser())
  .use(
    history({
      verbose: true,
      rewrites: [
        { from: /\/login/, to: "/login" },
        { from: /\/callback/, to: "/callback" },
        { from: /\/refresh_token/, to: "/refresh_token" },
      ],
    })
  )
  .use(express.static(path.resolve(__dirname, "client/build")));

let previousCode = "";
app.get("/", function (req, res) {
  res.render(path.resolve(__dirname, "client/build/index.html"));
});

const generateRandomString = function (length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const scope =
  "user-read-private user-read-email user-read-playback-state user-top-read user-read-recently-played user-follow-read user-library-read";

const stateKey = "spotify_auth_state";

const URL =
  `https://accounts.spotify.com/authorize?` +
  new URLSearchParams({
    client_id,
    response_type: "code",
    scope: scope,
    redirect_uri,
    show_dialog: "true",
    state: generateRandomString(16),
  });

app.get("/login", function (req, res) {
  console.log("login hit");
  const state = generateRandomString(16);
  res.cookie(stateKey, state);
  res.redirect(URL);
});

app.get("/callback", function (req, res) {
  console.log("hit callback");
  var code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;
  if (code === previousCode) {
    res.json({ message: "Spotify Authorization code has expired" });
  } else {
    previousCode = code;
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
      json: true,
    };
    request.post(options, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        const refresh_token = body.refresh_token;
        res.redirect(
          `http://localhost:8080/#` +
            new URLSearchParams({ access_token, refresh_token })
        );
      } else {
        res.redirect(
          `http://localhost:8080/#` +
            new URLSearchParams({ error: "invalid_token" })
        );
      }
    });
  }
});

app.post("/refresh_token", function (req, res) {
  console.log(req.query.refresh_token);
  var refreshToken = req.query.refresh_token || null;
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
    request.post(options, function (error, response, body) {
      let cookie = new Cookies(req, res);
      let data = JSON.parse(body);
      if (!error && response.statusCode === 200) {
        cookie.set("access_token", data.access_token, {
          maxAge: data.expires_in * 1000,
          overwrite: true,
        });
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

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(port, function () {
  console.log("App listening on port: " + port);
});
