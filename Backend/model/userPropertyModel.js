const mongoose = require("mongoose");

const userPropertySchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please enter Your name!"],
  },
  propertyNumber: {
    type: String,
    required: [true, "Please enter Property Number!"],
    unique: true,
  },
  propertySize: {
    type: String,
    required: [true, "Please enter the property area!"],
  },
  wardNumber: {
    type: Number,
    min: [1, "Please enter valid ward Number!"],
    max: [399, "Please enter valid ward Number!"],
  },
  payableTax: {
    type: Number,
  },
  category: {
    type: String,
    enum: ["Residential", "Commercial", "OpenLand", "Construction"],
  },
  typeOfConstruction: {
    type: String,
  },
  yearOfConstruction: {
    type: String,
  },
  propertyAddress: {
    type: String,
    required: [true, "Please enter property address!"],
  },
  occupancyType: {
    type: String,
  },
});

const UserProperty = new mongoose.model("UserProperty", userPropertySchema);
module.exports = UserProperty;
