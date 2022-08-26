const express = require("express");
const viewController = require("../controller/viewController");
const authController = require("../controller/authController");

const router = express.Router();

// router.use(authController.isLoggedIn);

router.route("/").get(viewController.overview);
router.route("/adminLogin").get(viewController.adminLogin);
router.route("/adminDashboard").get(viewController.adminDashboard);
router.route("/tables.pug").get(viewController.adminTables);
router.route("/adminManageUser.pug").get(viewController.adminManageUser);
router.route("/userSignup").get(viewController.userSignup);
router.route("/userLogin").get(viewController.userLogin);
router
  .route("/userDashboard")
  .get(authController.protect, viewController.userDashboard);

router
  .route("/userProfile")
  .get(authController.protect, viewController.userProfile);

router
  .route("/requestRegister")
  .get(authController.protect, viewController.requestRegister);
router.route("/generateTaxForm").get(viewController.generateTax);

module.exports = router;
