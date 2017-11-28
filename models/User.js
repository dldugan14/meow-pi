const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

//On Save Hook, encrypt the password
//Before saving a model, run this function
UserSchema.pre("save", function(next) {
  //capture current user
  const user = this;

  //generate a salty pirate, lol
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    // now we have a salt to apply to our password
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }

      //replace user.password with new fancy hash
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      next(err);
    }
    callback(null, isMatch);
  });
};

//export for uses
const User = mongoose.model("User", UserSchema);
module.exports = User;
