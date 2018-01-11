const mongoose = require("./connection");
const bcrypt = require("bcrypt-nodejs");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  username: { type: String, required: true },
  password: String,
  friends: []
});

// UserSchema.pre("save", function(next) {
//   const user = this,
//     SALT_FACTOR = 5;
//
//   if (!user.isModified("password")) return next();
//
//   bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
//     if (err) return next(err);
//
//     bcrypt.hash(user.password, salt, null, function(err, hash) {
//       if (err) return next(err);
//       user.password = hash;
//       next();
//     });
//   });
// });
//
// UserSchema.methods.comparePassword = function(candidatePassword, cb) {
//   bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//     if (err) {
//       return cb(err);
//     }
//
//     cb(null, isMatch);
//   });
// };

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
