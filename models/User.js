const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");

const UserSchema = new Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true,
    require: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, "is invalid"],
    index: true
  },
  email: { type: String, unique: true, lowercase: true },
  hash: String,
  salt: String
});

//On Save Hook, encrypt the password
//Before saving a model, run this function
UserSchema.pre("save", function(next) {
  //capture current user
  const user = this;

  //generate a salty pirate, lol
  // user.salt = crypto.randomBytes(16).toString("hex");
  // user.hash = crypto
  //   .pbkdf2Sync(user.password, user.salt, 10000, 512, "sha512")
  //   .toString("hex");
  next();
});

//create user salt and hashcakes from password
UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
  var candidateHash = crypto
    .pbkdf2Sync(candidatePassword, this.salt, 10000, 512, "sha512")
    .toString("hex");
  if (!candidateHash) {
    const err = new Error("Failed Hash");
    callback(err, false);
  } else if (this.hash === candidateHash) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

//export for uses
module.exports = mongoose.model("User", UserSchema);
