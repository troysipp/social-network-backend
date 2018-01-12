const passport = require("passport");
const passportJwt = require("passport-jwt");

const ExtractJwt = passportJwt.ExtractJwt;
const Strategy = passportJwt.Strategy;
const users = require("./db/schema").User;
const cfg = require("./config.js");

const params = {
  secretOrKey: cfg.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = function() {
  let strategy = new Strategy(params, function(payload, done) {
    let user = users[payload.id] || null;
    if (user) {
      return done(null, {
        id: user.id
      });
    } else {
      return done(new Error("User not found"), null);
    }
  });
  passport.use(strategy);
  return {
    initialize: function() {
      return passport.initialize();
    },
    authenticate: function() {
      return passport.authenticate("jwt", cfg.jwtSession);
    }
  };
};
