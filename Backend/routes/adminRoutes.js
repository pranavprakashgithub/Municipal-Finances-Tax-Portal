const express = require("express");
const authcontroller = require("./../controller/authController");
const router = express.Router();

router.route("/createAdmin").post(authcontroller.createAdmin);
router.route("/adminLogin").post(authcontroller.adminLogin);

module.exports = router;
