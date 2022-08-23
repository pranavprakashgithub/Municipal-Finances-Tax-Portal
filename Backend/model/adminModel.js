const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  adminId: {
    type: String,
    required: [true, "Admin must have Id!"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Admin must have password!"],
    select: false,
  },
});

const Admin = new mongoose.model("Admin", adminSchema);
module.exports = Admin;
