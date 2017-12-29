const LocalStrategy = require("passport-local").Strategy;
const User = require('../../src/model/users');
const bcrypt = require("bcrypt");

const LocalLogin = new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, username, password, done) {

  process.nextTick(function () {

    User.findOne({'username': req.body.username}, function(err, user){
      if(err) throw err;

      if(!user){
        console.log('bhak salla');
        return done(null, false, {message: 'No user found'});
      }

      bcrypt.compare(password, user.password, function(err, isMatch){
        if(err) throw err;

        if(isMatch) return done(null, user);
        else {
          console.log('nooo');
          return done(null, false, {message: 'Wrong password'});
        }
      });
    });
  });
});


const LocalSignup = new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, username, password, done) {

  process.nextTick(function() {
    User.findOne({'username': username}, function(err, user){
      if(err) throw err;

      if(user) {
        return done(null, false, { message: "User Exist" });
      } else {

        bcrypt.hash(password, 10).then(function(hash) {

          var newUser = new User({
            username: req.body.username,
            password: hash
          });

          newUser.save(function (err) {
            if(err) throw err
            return done(null, newUser);
          });
        });
      }
    });
  });
});

module.exports = { LocalSignup, LocalLogin };
