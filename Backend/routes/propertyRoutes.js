const express = require("express");
const propertyController = require("../controller/propertyController");

const router = express.Router();

router.route("/registerProperty").post(propertyController.registerProperty);

module.exports = router;
