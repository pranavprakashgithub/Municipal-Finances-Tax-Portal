const express = require("express");
const path = require("path");
const adminRouter = require("./routes/adminRoutes");
const viewRouter = require("./routes/viewsRoutes");
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", viewRouter);
app.use("/api/v1/admin", adminRouter);
module.exports = app;
