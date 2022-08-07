const Admin = require("../model/adminModel");

exports.createAdmin = async (req, res) => {
  try {
    const admin = await Admin.create({
      adminId: req.body.adminId,
      password: req.body.password,
    });
    res.status(200).json({
      status: "success",
      data: {
        admin,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      error: err.stack,
    });
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { adminId, password } = req.body;
    //1) Check if there is id and Password.
    if (!adminId || !password) {
      throw new Error("Please provide ID and PASSWORD!!", 404);
    }
    // 2) Check if admin exits or not
    const admin = await Admin.findOne({ adminId: adminId }).select("+password");
    // 3) Check  if PASSWORD is correct
    if (!admin || !(admin.password === password)) {
      throw new Error("Incorrect ID or PASSWORD!", 401);
    }
    // 4) Login Admin if everything is OK.
    res.status(200).json({
      status: "success",
      message: "Logged in!",
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      error: err.stack,
    });
  }
};
