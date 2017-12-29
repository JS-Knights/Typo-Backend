const passport = require("Passport");
const strategies = require("./stratagies");
const User = require('../../src/model/users');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


passport.use("local-signup", strategies.LocalSignup);

passport.use("local-login", strategies.LocalLogin);

module.exports = passport;
