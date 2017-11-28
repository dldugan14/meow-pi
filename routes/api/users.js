var mongoose = require("mongoose");
var userRouter = require("express").Router();
const passport = require("passport");
const jwt = require("jwt-simple");

const passportService = require("../../passport");
const requireLogin = passport.authenticate("local", { session: false });

//User login. payload will have user object with email and password
userRouter.route("/login").post(requireLogin, function(req, res, next) {
  const user = req.body.user;
  if (!user.email) {
    res.status(422).json({ errors: { email: "cannot be blank" } });
  }
  if (!user.password) {
    res.status(422).json({ errors: { password: "cannot be blank" } });
  }

  //here we'll do our passport auth to check for user in local db

  res.send({ token: tokenForUser(req.user) });
});

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode(
    {
      sub: user.id,
      iat: timestamp,
      email: user.email
    },
    process.env.SUPER_JWT_SECRET
  );
}

module.exports = userRouter;
