var mongoose = require("mongoose");
var userRouter = require("express").Router();
const passport = require("passport");
const jwt = require("jwt-simple");

const passportService = require("../../passport");
const requireLogin = passport.authenticate("local", { session: false });

// var User = require("../../models/User");
const User = mongoose.model("User");

//User login. payload will have user object with email and password
userRouter.route("/login").post(requireLogin, function(req, res, next) {
  //here we'll do our passport auth to check for user in local db
  res.send({
    token: tokenForUser(req.user),
    email: req.user.email
  });
});

//New User Registar endpoint. That will take username, email, passwordy
userRouter.route("/").post(function(req, res, next) {
  var user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  //userpassword????
  user.setPassword(req.body.password);

  user.save(function(err, userPayload) {
    if (err) {
      next(err);
    } else {
      res.json({ user: jsonForUser(userPayload) });
    }
  });
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

//Return user payload
function jsonForUser(user) {
  return {
    username: user.username,
    email: user.email,
    token: tokenForUser(user)
    // bio: this.bio,
    // image: this.image
  };
}

module.exports = userRouter;
