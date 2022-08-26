const Admin = require("../model/adminModel");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signToken = (id) => {
  const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);
  res.status(statusCode).json({
    token,
    status: "success",
    data: {
      users: user,
    },
  });
};

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

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      fname: req.body.fname,
      lname: req.body.lname,
      adharNumber: req.body.adharNumber,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).json({
      status: "created",
      user: newUser,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // 1) Check if email and password exists!
    if (!email || !password) {
      throw new Error("Email and password not found!", 404);
    }
    // 2) check if user exists with Id!
    const user = await User.findOne({ email: email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new Error("Incorrect email && password!", 401);
    }

    createSendToken(user, 200, res);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

exports.protect = async (req, res, next) => {
  // 1) Getting token and check of it's there
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(
        // new AppError("You are not logged in! Please log in to get access.", 401)
        new Error("You are not logged in! Please log in to get access.", 401)
      );
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new Error("The user belonging to this token does no longer exist.", 401)
      );
    }

    // 4) Check if user changed password after the token was issued
    // if (currentUser.changedPasswordAfter(decoded.iat)) {
    //   return next(
    //     new Error("User recently changed password! Please log in again.", 401)
    //   );
    // }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    res.locals.user = currentUser;
    // console.log(currentUser);
    next();
  } catch (err) {
    return next(err);
  }
};

// exports.isLoggedIn = async (req, res, next) => {
//   if (req.cookies.jwt) {
//     try {
//       // 1) verify token
//       const decoded = await promisify(jwt.verify)(
//         req.cookies.jwt,
//         process.env.JWT_SECRET
//       );
//       // 2) Check if user still exists
//       const currentUser = await User.findById(decoded.id);
//       if (!currentUser) {
//         return next();
//       }

//       // 3) Check if user changed password after the token was issued
//       // if (currentUser.changedPasswordAfter(decoded.iat)) {
//       //   return next();
//       // }

//       // THERE IS A LOGGED IN USER
//       res.locals.user = currentUser;
//       console.log(currentUser);
//       return next();
//     } catch (err) {
//       return next();
//     }
//   }
//   next();
// };
