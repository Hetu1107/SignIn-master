const mongoose = require("mongoose");
const DATABASE =process.env.MONGODB_URI|| 
  "mongodb+srv://zaid123:zaid123@cluster0.4w0sr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

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
