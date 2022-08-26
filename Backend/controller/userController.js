const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

exports.updateUser = async (req, res, next) => {
  try {
    let token;
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    if (!token) {
      return next(
        // new AppError("You are not logged in! Please log in to get access.", 401)
        new Error("You are not logged in! Please log in to get access.", 401)
      );
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // console.log(decoded);
    const { mobileNumber, address, pinCode, houseNumber } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      {
        mobileNumber,
        address,
        pinCode,
        houseNumber,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.locals.user = updatedUser;
    res.status(200).json({
      status: "updated",
      data: updatedUser,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.stack,
    });
  }
};
