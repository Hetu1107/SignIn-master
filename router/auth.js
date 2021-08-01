const express = require("express");
const router = express.Router();
require("../DB/conn");
const User = require("../model/voterSchema");
const Container = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send("Hello from server auth.js");
});

router.post("/register", async (req, res) => {
  //   res.json({ message: req.body });
  const optionSelected = req.body.optionSelected;
  const email = req.body.email;
  const id = req.body.id;
  const todo = new User({ optionSelected, email, id });

  const dup = await User.findOne({ id: id, email: email });
  if (dup) {
    console.log("exists");
    res.send({ success: false, message: "You can only vote once" });
  }
  if (!dup) {
    todo.save(function (err) {
      if (err) {
        return res.status(422).send(err);
      }
      res.json({
        success: true,
      });
    });
  }
});

router.post("/hoster", async (req, res) => {
  //   res.json({ message: req.body });
  const id = req.body.id;
  const name = req.body.name;
  const email = req.body.email;
  const hoster = new Container({ id, name, email });

  hoster.save(function (err) {
    if (err) {
      if (err.name === "MongoError" && err.code === 11000) {
        return res
          .status(422)
          .send({ success: false, message: "You can only vote once" });
      }
      return res.status(422).send(err);
    }
    res.json({
      success: true,
    });
  });
});

router.get("/show/:id", function (req, res) {
  Container.find({ id: req.params.id }, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

router.get("/del/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, msg: "Product Deleted" });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
