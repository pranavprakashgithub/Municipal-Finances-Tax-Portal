const UserProperty = require("../model/userPropertyModel");
const User = require("../model/userModel");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/propertyDoc");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `user-${Date.now()}.${ext}`);
  },
});
const multerFilter = (req, file, cb) => {
  //
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error(`Not an image!, Please upload only images!`, 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadPropertyDocs = upload.single("propertyPhoto");

exports.calculateTax = async (req, res, next) => {
  try {
    let uav = 0;
    let ageFactor = 0;
    let useFactor = 0;
    let structureFactor = 0;
    let occupancyFactor = 0;
    let taxRate = 0;
    const {
      propertyNumber,
      propertySize,
      wardNumber,
      category,
      typeOfConstruction,
      yearOfConstruction,
      propertyAddress,
      occupancyType,
    } = req.body;
    if (category === "Residential") {
      useFactor = 1;
    } else if (category === "Commercial") {
      useFactor = 4;
    } else if (category === "OpenLand") {
      useFactor = 1;
    } else if (category === "Construction") {
      useFactor = 2;
    }
    if (typeOfConstruction === "Pucca(RCC Building)") {
      structureFactor = 1.0;
    } else if (typeOfConstruction === "Semi-Pucca") {
      structureFactor = 1.0;
    } else if (typeOfConstruction === "Kachcha") {
      structureFactor = 0.5;
    }
    if (wardNumber <= 99) {
      //cat - A
      uav = 630;
    } else if (wardNumber <= 199) {
      //cat - B
      uav = 500;
    } else if (wardNumber <= 299) {
      //cat - C
      uav = 320;
    } else if (wardNumber <= 399) {
      //cat - D
      uav = 100;
    }
    if (occupancyType === "Self occupied") {
      occupancyFactor = 1.0;
    } else if (occupancyType === "Rented out") {
      occupancyFactor = 2.0;
    } else if (occupancyType === "Vacant plot") {
      occupancyFactor = 0.6;
    }
    if (yearOfConstruction === "Before 1960") {
      ageFactor = 0.5;
    } else if (yearOfConstruction === "1960 to 1969") {
      ageFactor = 0.6;
    } else if (yearOfConstruction === "1970 t0 1979") {
      ageFactor = 0.7;
    } else if (yearOfConstruction === "1980 to 1989") {
      ageFactor = 0.8;
    } else if (yearOfConstruction === "1990 to 1999") {
      ageFactor = 0.9;
    } else if (yearOfConstruction === "2000 Onwards") {
      ageFactor = 1.0;
    }
    if (category === "Residential") {
      //
      if (wardNumber <= 99) {
        //cat - A
        taxRate = 12;
      } else if (wardNumber <= 199) {
        //cat - B
        taxRate = 11;
      } else if (wardNumber <= 299) {
        //cat - C
        taxRate = 11;
      } else if (wardNumber <= 399) {
        //cat - D
        taxRate = 7;
      }
    } else if (category === "Commercial") {
      taxRate = 20;

      //
    } else if (category === "OpenLand") {
      //   if (wardNumber <= 99) {
      //     //cat - A
      //     taxRate = 15;
      //   } else if (wardNumber <= 199) {
      //     //cat - B
      //     taxRate = 15;
      //   } else if (wardNumber <= 299) {
      //     //cat - C
      //     taxRate = 12;
      //   } else if (wardNumber <= 399) {
      //     //cat - D
      //     taxRate = 10;
      //   }
      taxRate = 5;
      //
    } else if (category === "Construction") {
      //   if (wardNumber <= 99) {
      //     //cat - A
      //   } else if (wardNumber <= 199) {
      //     //cat - B
      //   } else if (wardNumber <= 299) {
      //     //cat - C
      //   } else if (wardNumber <= 399) {
      //     //cat - D
      //   }
      taxRate = 7;
      //
    }
    const propertySizeInMeter = propertySize / 10.7639;
    const annualValue =
      propertySizeInMeter *
      1 *
      uav *
      ageFactor *
      useFactor *
      structureFactor *
      occupancyFactor;
    const tax = (annualValue * (taxRate / 100)).toFixed(2);

    res.status(200).json({
      status: "success",
      data: {
        tax,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.stack,
    });
  }
};

exports.propertyDetails = async (req, res, next) => {
  // console.log(req.file);
  // console.log(req.body);
  try {
    //
    // let token;
    // if (req.cookies.jwt) {
    //   token = req.cookies.jwt;
    // }
    // if (!token) {
    //   return next(
    //     // new AppError("You are not logged in! Please log in to get access.", 401)
    //     new Error("You are not logged in! Please log in to get access.", 401)
    //   );
    // }
    // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // console.log(decoded);

    const {
      fullName,
      propertySize,
      propertyNumber,
      wardNumber,
      category,
      typeOfConstruction,
      yearOfConstruction,
      propertyAddress,
      occupancyType,
      payableTax,
    } = req.body;
    const newPropertyDetails = await UserProperty.create({
      fullName,
      propertySize,
      propertyNumber,
      wardNumber,
      category,
      typeOfConstruction,
      yearOfConstruction,
      propertyAddress,
      occupancyType,
      payableTax,
    });
    let updateUser;
    if (newPropertyDetails) {
      updateUser = await User.findByIdAndUpdate(decoded.id, {
        $push: { property: newPropertyDetails.id },
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        newPropertyDetails,
        updateUser,
      },
    });
  } catch (err) {
    //
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};
