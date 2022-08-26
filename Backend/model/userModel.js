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
  mobileNumber: {
    type: String,
    validate: [validator.isNumeric, "Please Enter valid Mobile Number!"],
    minlength: 10,
    maxlength: 10,
    // required: [true, "Please enter your Mobile Number!"],
  },
  adharNumber: {
    type: String,
    required: [true, "Please enter your aadhar Number!"],
    validate: [validator.isNumeric, "Please enter valid Aadhar Number!"],
    unique: true,
    minlength: [12, "Please enter valid adhar number!"],
    maxlength: [12, "Please enter valid adhar number!"],
  },
  address: {
    type: String,
    // required: [true, "Please enter your address!"],
  },
  pinCode: {
    type: Number,
    // required: [true, "Please enter pincode!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email1"],
    validate: [validator.isEmail, "Please enter valid Email!"],
    unique: true,
  },
  property: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "UserProperty",
    },
  ],
  houseNumber: {
    type: Number,
    // required: [true, "Please enter House number!"],
  },
  password: {
    type: String,
    required: [true, "Please enter Password!"],
    minlength: [8, "Please enter Password with atleast 8 chars!"],
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
