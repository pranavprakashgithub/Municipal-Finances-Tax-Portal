const express = require("express");
const viewController = require("../controller/viewController");

const router = express.Router();

router.route("/").get(viewController.overview);
router.route("/adminLogin.pug").get(viewController.adminLogin);
router.route("/adminDashboard.pug").get(viewController.adminDashboard);
router.route("/tables.pug").get(viewController.adminTables);
router.route("/adminManageUser.pug").get(viewController.adminManageUser);

module.exports = router;
