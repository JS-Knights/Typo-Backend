//use connect-mongo for session storage in production
require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const cp = require("cookie-parser");
const bp = require("body-parser");
const passport = require("./Config/Passport/Passport.js");
const cors = require("cors");
const routes = require("./Src/Routes/Login");
const flash = require("connect-flash");

const app = express();
//trying to commit

app.use(cp("somesecret"));
app.use(
  session({
    secret: "somesecret"
  })
);

app.use(cors());
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use((r, s, n) => {
  console.log("in a mid", r.user);
  n();
});

app.use("/", routes);

app.listen(1234, function() {
  console.log("Server started on http://localhost:1234");
});
