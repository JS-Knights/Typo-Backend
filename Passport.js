const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const ud = require("./db").ud;
const bcrypt = require("bcrypt");

passport.serializeUser(function(user, done) {
  console.log("serialize start");
  done(null, user.id);
  console.log("serialize end");
});

passport.deserializeUser(function(id, done) {
  console.log("deserialize");
  ud
    .findById(id)
    .then(function(user) {
      done(null, user.dataValues);
    })
    .catch(function(err) {
      done(err, false);
    });
});

const LocalLogin = new LocalStrategy(function(username, password, done) {
  console.log("local strategy");
  if (username) username = username.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

  ud
    .findOne({ where: { username: username } })
    .then(function(user) {
      if (user.username === username) {
        bcrypt.compare(password, user.pass).then(function(res) {
          // res == true
          if (res) {
            done(null, user.dataValues);
          } else {
            done(null, false, { Message: "wrong pass" });
          }
        });
      } else {
        done(null, false, { message: "User not found" });
      }
    })
    .catch(function(err) {
      done(null, false, { message: "User not found" });
    });
});

const LocalSignup = new LocalStrategy(function(req, email, password, done) {
  if (email) email = email.toLowerCase();

  process.nextTick(function() {
    ud
      .findOne({ where: { username: email } })
      .then(function(user) {
        if (user) {
          return done(null, false, { message: "User Exist" });
        } else {
          bcrypt.hash(password, 10).then(function(hash) {
            ud
              .create({
                username: email,
                pass: hash
              })
              .then(function(user) {
                return done(null, user.dataValues);
              })
              .catch(function(err) {
                throw err;
              });
          });
        }
      })
      .catch(err => done(err));
  });
});

passport.use("local-signup", LocalSignup);

passport.use("local-login", LocalLogin);

module.exports = passport;
