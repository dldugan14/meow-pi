const passport = require("passport");
const User = require("./models/user");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");
require("dotenv").config();

//Create Local Strategy
const localOptions = { usernameField: "email" };
const localLogin = new LocalStrategy(localOptions, function(
  email,
  password,
  done
) {
  //Verify this email and password, call done aka callback
  User.findOne({ email: email }),
    function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
    };
  // compare passwords = is 'password' equal to user.password? meow?
  User.comparePassword(password, function(err, isMatch) {
    if (err) {
      return done(err);
    }
    if (!isMatch) {
      return done(null, false);
    }

    //you are who you say you are!
    return done(null, user);
  });
});

//setup options for jwt strat
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: process.env.SUPER_JWT_SECRET
};

//Create JWT Strategy
console.log(process.env.SUPER_JWT_SECRET);
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the user ID aka payload.sub in the payload exists in our database
  // If it does, call 'done' with that other
  // otherwise, call done without a user object
  User.findById(payload.sub, function(err, user) {
    if (err) {
      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);
