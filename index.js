const express = require("express");
const app = express();
const parser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jwt-simple");
const passport = require("passport");
const cfg = require("./config.js");

const auth = require("./auth")();
const Event = require("./db/schema").Event;
const User = require("./db/schema").User;
const City = require("./db/schema").City;

app.use(parser.json());
app.use(auth.initialize());

let cors_list;

if (process.env.NODE_ENV === "production") {
  //   cors_list = {
  //     origin: "http://home-finder.surge.sh",
  //     default: "http://home-finder.surge.sh"
  //   };
  // } else {
  cors_list = {
    origin: "http://localhost:3000",
    default: "http://localhost:3000"
  };
}

app.use(cors(cors_list));

app.listen(3001, () => {
  console.log("app listening on port 3001");
});

app.get("/", (req, res) => {
  res.send("hello there");
});

app.post("/api/login", function(req, res) {
  if (req.body.email && req.body.password) {
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        if (req.body.password === user.password) {
          let payload = { id: user.id };
          let token = jwt.encode(payload, cfg.jwtSecret);
          res.json({ token: token });
        } else {
          res.sendStatus(500);
        }
      } else {
        res.sendStatus(503);
      }
    });
  } else {
    res.sendStatus(401);
  }
});

app.post("/api/signup", function(req, res) {
  if (req.body.email && req.body.password) {
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        res.sendStatus(500);
      } else {
        bcrypt.hash(req.body.password, 10, function(err, hash) {
          let user = new User(req.body);
          user.save((err, createdUserObject) => {
            if (user) {
              let payload = { id: user.id };
              let token = jwt.encode(payload, cfg.jwtSecret);
              res.json({ token: token });
            } else {
              res.sendStatus(401);
            }
          });
        });
      }
    });
  } else {
    res.sendStatus(401);
  }
});

app.get("/api/events", (req, res) => {
  // console.log(req);
  // if (req.headers.token && req.headers.token.length > 0) {
  //   let userid = jwt.decode(req.headers.token, cfg.jwtSecret).id;
  Event.find()
    .then(events => {
      res.json({
        events
      });
    })
    .catch(err => console.log(err));
});

app.get("/api/cities", (req, res) => {
  City.find()
    .then(cities => {
      res.json({
        cities
      });
    })
    .catch(err => console.log(err));
});

// app.get("/api/cities/:name", (req, res) => {
//   console.log("here!");
//   console.log(req.params.name);
//   City.findOne({ name: req.params.name }, function(err, foundCity) {
//     console.log(err);
//     console.log(res);
//   })
//     .then(city => {
//       console.log(city);
//       res
//         .json({
//           events: city.events
//         })
//         .catch(err => console.log(err));
//     })
//     .catch(err => console.log(err));
// });

app.get("/api/users", (req, res) => {
  User.find()
    .then(users => {
      res.json({
        users
      });
    })
    .catch(err => console.log(err));
});

module.exports = app;
