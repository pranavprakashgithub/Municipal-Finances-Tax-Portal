const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
const port = process.env.PORT || 3000;

dotenv.config({ path: "config.env" });
// const db =
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful!");
  });

app.listen(port, () => {
  console.log(`Connected to port : ${port}`);
});
