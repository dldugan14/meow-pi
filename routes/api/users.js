var mongoose = require("mongoose");
var userRouter = require("express").Router();

//User login. payload will have user object with email and password
userRouter.route("/login").post(function(req, res, next) {
  const user = req.body.user;
  if (!user.email) {
    res.status(422).json({ errors: { email: "cannot be blank" } });
  }
  if (!user.password) {
    res.status(422).json({ errors: { password: "cannot be blank" } });
  }

  //here we'll do our passport auth to check for user in local db
});
