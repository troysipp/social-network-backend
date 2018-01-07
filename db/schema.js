const mongoose = require("./connection");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  username: { type: String, required: true },
  password: String,
  friends: [UserSchema]
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
