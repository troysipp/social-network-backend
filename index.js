const express = require("express");
const app = express();
const parser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");
const bcrypt = require("bcrypt-nodejs");

const auth = require("./auth")();
const Event = require("./db/schema").Event;
const User = require("./db/schema").User;
const City = require("./db/schema").City;

app.use(logger("dev"));
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));
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

app.post("/users", function(req, res) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send("You must send the username and the password");
  }
  if (User.findOne({ email: req.body.username })) {
    return res.status(400).send("A user with that username already exists");
  }
  let profile = _.pick(req.body, userScheme.type, "password", "extra");
  profile.id = _.max(users, "id").id + 1;
  users.push(profile);
  res.status(201).send({
    id_token: createIdToken(profile),
    access_token: createAccessToken()
  });
});

// app.get("/users", auth.authenticate(), function(req, res) {
//   res.json(users[req.user.id]);
// });
//
// app.post("/api/login", function(req, res) {
//   if (req.body.email && req.body.password) {
//     User.findOne({ email: req.body.email }).then(user => {
//       if (user) {
//         bcrypt.compare(req.body.password, user.password, function(
//           err,
//           response
//         ) {
//           if (response) {
//             let payload = { id: user.id };
//             let token = jwt.encode(payload, cfg.jwtSecret);
//             res.json({ token: token });
//           } else {
//             res.sendStatus(500);
//           }
//         });
//       } else {
//         res.sendStatus(500);
//       }
//     });
//   } else {
//     res.sendStatus(401);
//   }
// });
//
// app.post("/api/signup", function(req, res) {
//   if (req.body.email && req.body.password) {
//     User.findOne({ email: req.body.email }).then(user => {
//       if (user) {
//         res.sendStatus(500);
//       } else {
//         bcrypt.hash(req.body.password, 10, function(err, hash) {
//           User.create({ email: req.body.email, password: hash }).then(user => {
//             if (user) {
//               let payload = { id: user.id };
//               let token = jwt.encode(payload, cfg.jwtSecret);
//               res.json({ token: token });
//             } else {
//               res.sendStatus(401);
//             }
//           });
//         });
//       }
//     });
//   } else {
//     res.sendStatus(401);
//   }
// });

// app.get("/", function(req, res) {
//     res.json({
//         status: "My API is alive!"
//     });
// });

// app.post("/token", function(req, res) {
//   if (req.body.email && req.body.password) {
//     let email = req.body.email;
//     let password = req.body.password;
//     let user = users.find(function(u) {
//       return u.email === email && u.password === password;
//     });
//     if (user) {
//       let payload = {
//         id: user.id
//       };
//       let token = jwt.encode(payload, cfg.jwtSecret);
//       res.json({
//         token: token
//       });
//     } else {
//       res.sendStatus(401);
//     }
//   } else {
//     res.sendStatus(401);
//   }
// });

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
