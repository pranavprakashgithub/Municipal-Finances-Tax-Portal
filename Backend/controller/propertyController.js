const Property = require("../model/propertyModel");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { spawn } = require("child_process");

exports.registerProperty = async (req, res, next) => {
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

    if (!decoded) {
      return new Error("User belonging to this token doesn't exist!");
    }
    // console.log(decoded);

    const {
      oldPropOwnerName,
      mobileNumber,
      adharNumber,
      propertyNumber,
      propertyAddress,
      areaPincode,
    } = req.body;

    const newProperty = await Property.create({
      oldPropOwnerName,
      mobileNumber,
      adharNumber,
      propertyNumber,
      propertyAddress,
      areaPincode,
    });
    // console.log(newProperty._id);
    // let updateUser;
    // if (newProperty) {
    //   updateUser = await User.findByIdAndUpdate(decoded.id, {
    //     $push: { property: newProperty },
    //   });
    // }

    res.status(200).json({
      status: "success",
      property: newProperty,
      updateUser,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

exports.viewChart = (req, res) => {
  let data1;
  const childPython = spawn("python", ["knn_fetching.py"]);
  childPython.stdout.on("data", (data) => {
    // console.log(`stdout: ${data}`);
    data1 = data.toString();
  });

  childPython.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });
  childPython.on("close", (code) => {
    // console.log(`child process exited with code : ${code}`);
    res.send(data1);
  });
};
