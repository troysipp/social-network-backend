const express = require("express");
const app = express();
const parser = require("body-parser");

app.use(parser.json());
// app.use(auth.initialize());

const Event = require("./db/schema").Event;
const User = require("./db/schema").User;
const City = require("./db/schema").City;

app.listen(3001, () => {
  console.log("app listening on port 3001");
});

app.get("/", (req, res) => {
  res.send("hello there");
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
