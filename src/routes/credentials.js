const express = require("express");
var router = express.Router();

const createToken = require("../../utils/token.js");
const passport = require("../../config/passport/passport.js");

router.post('/signup', passport.authenticate("local-signup"), function(req, res) {
  res.send({ token: createToken(req.user) });
});

router.post('/login', passport.authenticate("local-login"), function(req, res) {
  res.send({ token: createToken(req.user) });
});

router.get('/', function(req, res) {
  res.send({x:'Welcome to API'});
});

module.exports = router;
