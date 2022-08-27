const express = require("express");
const propertyController = require("../controller/propertyController");

const router = express.Router();

router.route("/registerProperty").post(propertyController.registerProperty);
router.route("/viewChart").get(propertyController.viewChart);

module.exports = router;
