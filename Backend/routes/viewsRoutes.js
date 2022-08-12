const express = require("express");
const viewController = require("../controller/viewController");
const authController = require("../controller/authController");

const router = express.Router();

// router.use(authController.isLoggedIn);

router.route("/").get(viewController.overview);
router.route("/adminLogin.pug").get(viewController.adminLogin);
router.route("/adminDashboard.pug").get(viewController.adminDashboard);
router.route("/tables.pug").get(viewController.adminTables);
router.route("/adminManageUser.pug").get(viewController.adminManageUser);
router.route("/userSignup.pug").get(viewController.userSignup);
router.route("/userLogin.pug").get(viewController.userLogin);
router
  .route("/userDashboard.pug")
  .get(authController.protect, viewController.userDashboard);

router
  .route("/userProfile.pug")
  .get(authController.protect, viewController.userProfile);

router.route("/requestRegister").get(viewController.requestRegister);

module.exports = router;
