const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  oldPropOwnerName: {
    type: String,
  },
  mobileNumber: {
    type: String,
    required: [true, "\nPlease enter Your adhar Number! "],
  },
  adharNumber: {
    type: String,
    required: [true, "\nPlease enter your adhar Number! "],
  },
  propertyNumber: {
    type: String,
    required: [true, "\nPlease enter Your Property Number! "],
    unique: true,
  },
  propertyAddress: {
    type: String,
    required: [true, "\nPlease enter Property addresss! "],
  },
  areaPincode: {
    type: String,
    required: [true, "\nPlease enter pincode! "],
  },
  // newPropOwnerName: {
  //   type: String,
  //   required: [true, "Please enter new owner name!"],
  // },
  // newOwnerMobileNumber: {
  //   type: String,
  //   required: [true, "Please enter new Owner mobile Number!"],
  // },
  // newOwnerAdharNumber: {
  //   type: String,
  //   required: [true, "Please enter new owner adhar Number!"],
  // },
});

const Property = new mongoose.model("Property", propertySchema);
module.exports = Property;
