const express = require("express");
const userPropertyController = require("../controller/userPropertyController");
const multer = require("multer");
const router = express.Router();

router.route("/calculateTax").post(userPropertyController.calculateTax);
router
  .route("/propertyDetails")
  .post(
    userPropertyController.uploadPropertyDocs,
    userPropertyController.propertyDetails
  );

module.exports = router;
