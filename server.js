require("dotenv").config();

const express = require("express");
const path = require("path");

const session = require("express-session");
const cp = require("cookie-parser");
const bp = require("body-parser");
const cors = require("cors");
const flash = require("connect-flash");

const passport = require("./config/passport/passport.js");
const database = require('./config/database');
const routes = require("./src/routes/credentials");


const PORT = 6060 || process.env.port;
const app = express();

app.use(cp("somesecret"));

app.use(session({
  secret: 'helpmewiththis',
  resave: false,
  saveUninitialized: true
}));

app.use(cors());
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// app.use((r, s, n) => {
//   console.log("in a mid", r.user);
//   n();
// });

app.use("/", routes);

database.connectDB(() => {
  app.listen(PORT, err =>{
    if(err) throw err;
  });
});
