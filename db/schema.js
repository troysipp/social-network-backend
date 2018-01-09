const mongoose = require("./connection");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  username: { type: String, required: true },
  password: String,
  friends: []
});

const EventSchema = new mongoose.Schema({
  organizer: UserSchema,
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  attendees: [UserSchema]
});

const CitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  events: [EventSchema],
  people: [UserSchema]
});

const User = mongoose.model("User", UserSchema);
const Event = mongoose.model("Event", EventSchema);
const City = mongoose.model("City", CitySchema);

module.exports = {
  User,
  Event,
  City
};
