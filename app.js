const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const hostname = "http://127.0.0.1";
app.use(express.json());
app.use(express.static("public"));

const Todo = require("./model/userSchema");

const PORT = process.env.PORT || 5000;
// console.log(process.env.PORT);
require("./DB/conn");
dotenv.config({ path: "./config.env" });
app.use(require("./router/auth"));

const middleware = (req, res, next) => {
  cosole.log("Hello my middle ware");
  next();
};
// Todo.deleteOne({ title: "a" }, function (err) {
//   if (err) return handleError(err);
// });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "client/build/index.html");
});
// app.get("/*",(req,res)=>{
//   res.sendFile()
// })

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(PORT, () => {
  console.log(`Server is running at ${hostname}:${PORT}`);
});
