const User = require("./schema").User;
const City = require("./schema").City;
const Event = require("./schema").Event;

let troy = new User({
  id: 1,
  email: "troy@gmail.com",
  username: "troysippy",
  password: "troy"
});

let jackie = new User({
  id: 2,
  email: "jackie@gmail.com",
  username: "jackieo",
  password: "jackie"
});

let clara = new User({
  id: 3,
  email: "clara@gmail.com",
  username: "cpomi",
  password: "clara"
});

let stones = new User({
  id: 4,
  email: "stones@gmail.com",
  username: "stones",
  password: "jeffrey"
});

let soccer = new Event({
  organizer: troy,
  location: "On the mall",
  description: "Come play some casual footy on Saturday!",
  attendees: [jackie]
});

let teaTasting = new Event({
  organizer: jackie,
  location: "DC tea club",
  description: "Come chat and drink some tea this Wednesday afternoon!",
  attendees: [troy]
});

let dc = new City({
  name: "Washington D.C.",
  people: [troy, jackie],
  events: [soccer, teaTasting]
});

let nyc = new City({
  name: "New York City",
  people: [clara]
});

let boston = new City({
  name: "Boston",
  people: [stones]
});

let users = [troy, jackie, clara, stones];
let cities = [dc, nyc, boston];
let events = [soccer, teaTasting];

User.remove({})
  .then(() => {
    console.log("Users removed successfully!");
    users.forEach((user, i) => {
      users[i].save((err, user) => {
        err ? console.log(err) : console.log(user);
      });
    });
  })
  .catch(err => console.log(err));

City.remove({}).then(() => {
  console.log("Cities removed successfully");
  cities.forEach((city, i) => {
    cities[i].save((err, city) => {
      err ? console.log(err) : console.log(city);
    });
  });
});

Event.remove({}).then(() => {
  console.log("Events removed successfully");
  events.forEach((event, i) => {
    events[i].save((err, event) => {
      err ? console.log(err) : console.log(event);
    });
  });
});
