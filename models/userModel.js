const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    requried: true,
  },
});

// static signup method

userSchema.statics.signup = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("All Fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("password is not strong enough");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email in use");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash });

  return user;
};
// static login
userSchema.statics.login = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("All Fields must be filled");
  }
  //    const user = await this.findOne

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Email Not valid");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Password Not valid");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
