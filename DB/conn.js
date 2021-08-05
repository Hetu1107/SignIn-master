const mongoose = require("mongoose");
const DATABASE = process.env.MONGODB_URL;

const DB = DATABASE;

mongoose
  .connect(DB, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

const middleware = (req, res, next) => {
  console.log("hello my middleware");
  next();
};
