const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  fname: {
    type: String,
    required: [true, "user must have first name!"],
  },
  lname: {
    type: String,
    required: [true, "user must have last name!"],
  },
  mobileNo: {
    type: String,
    // validate: [
    //   validator.isMobilePhone,
    //   validator.isNumeric,
    //   "Please Enter valid Mobile Number!",
    // ],
    // required: [true, "Please enter your Mobile Number!"],
  },
  aadharNumber: {
    type: String,
    required: [true, "Please enter your aadhar Number!"],
    validate: [validator.isNumeric, "Please enter valid Aadhar Number!"],
  },
  address: {
    type: String,
    // required: [true, "Please enter your address!"],
  },
  pincode: {
    type: Number,
    // required: [true, "Please enter pincode!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email1"],
    validate: [validator.isEmail, "Please enter valid Email!"],
    unique: true,
  },
  houseNumber: {
    type: Number,
    // required: [true, "Please enter House number!"],
  },
  password: {
    type: String,
    required: [true, "Please enter Password!"],
  },
  passwordChangedAt: Date,
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  DBPassword
) {
  return await bcrypt.compare(candidatePassword, DBPassword);
};

userSchema.pre("save", async function (next) {
  //Only runs if password is modified
  if (!this.isModified("password")) return next();
  //Hash password at cost 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

const User = new mongoose.model("User", userSchema);
module.exports = User;
