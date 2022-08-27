const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
// const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const adminRouter = require("./routes/adminRoutes");
const viewRouter = require("./routes/viewsRoutes");
const userRouter = require("./routes/userRoutes");
const propertyRouter = require("./routes/propertyRoutes");
const userPropertyRouter = require("./routes/userPropertyRoute");

const app = express();

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);
// app.use(cors());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

// set security HTTP headers
// app.use(helmet());
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "script-src": [
          "'self'",
          "https://cdnjs.cloudflare.com/",
          "https://cdn.jsdelivr.net",
        ],
      },
    },
  })
);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against xss
app.use(xss());

app.use("/", viewRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/property", propertyRouter);
app.use("/api/v1/userProperty", userPropertyRouter);

// app.all("*", (req, res, next) => {
//   next(new Error(`Can't find ${req.originalUrl} on this server!`, 404));
// });
module.exports = app;
