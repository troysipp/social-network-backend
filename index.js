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
    console.log(req.body.email);
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        //  bcrypt.compare(
        if (req.body.password === user.password) {
          //   , function(
          //   err,
          //   response
          // ) {
          //   if (response) {
          let payload = { id: user.id };
          let token = jwt.encode(payload, cfg.jwtSecret);
          res.json({ token: token });
        } else {
          console.log(user);
          console.log(response);
          console.log(err);
          console.log(req.body.password.length);
          console.log(user.password.length);
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
          User.create({ email: req.body.email, password: hash }).then(user => {
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

// app.get("/api/homes", (req, res) => {
//   if (req.headers.token && req.headers.token.length > 0) {
//     let userid = jwt.decode(req.headers.token, cfg.jwtSecret).id;
//     Home.find()
//       .then(homes => {
//         res.json({
//           homes: homes,
//           userid: userid
//         });
//       })
//       .catch(err => console.log(err));
//   } else {
//     Home.find()
//       .then(homes => {
//         res.json({
//           homes: homes,
//           userid: ""
//         });
//       })
//       .catch(err => console.log(err));
//   }
// });
