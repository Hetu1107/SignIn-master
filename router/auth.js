const express = require("express");
const router = express.Router();
require("../DB/conn");
const User = require("../model/voterSchema");
const Container = require("../model/userSchema");
const Timer = require("../model/timerSchema");
const Input = require("../model/inputSchema");

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

router.post("/timer", async (req, res) => {
  //   res.json({ message: req.body });
  const date = req.body.date;
  const time = req.body.time;
  const id = req.body.id;
  const timer = new Timer({ date, time, id });

  timer.save(function (err) {
    if (err) {
      return res.status(422).send(err);
    }
    res.json({
      success: true,
    });
  });
});

router.post("/input", async (req, res) => {
  //   res.json({ message: req.body });
  const input = req.body.input;
  const id = req.body.id;
  const inp = new Input({ input, id });

  inp.save(function (err) {
    if (err) {
      return res.status(422).send(err);
    }
    res.json({
      success: true,
    });
  });
});

router.get("/getInput/:id", function (req, res) {
  Input.find({ id: req.params.id }, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

router.get("/time/:id", function (req, res) {
  Timer.find({ id: req.params.id }, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

router.get("/count/:name/:id", async (req, res) => {
  User.countDocuments(
    { optionSelected: req.params.name, id: req.params.id },
    function (err, count) {
      if (err) {
        console.log(err);
      } else {
        res.send({ count });
      }
    }
  );
});

router.post("/hoster", async (req, res) => {
  //   res.json({ message: req.body });
  const id = req.body.id;
  const name = req.body.name;
  const email = req.body.email;
  const hoster = new Container({ id, name, email });

  const dup = await Container.findOne({ id: id });
  if (dup) {
    console.log("already exist");
    res.send({
      success: false,
      message: "This Id already exists, please type a unique id.",
    });
  }
  if (!dup) {
    hoster.save(function (err) {
      if (err) {
        return res.status(422).send(err);
      }
      res.json({
        success: true,
      });
    });
  }
});

router.get("/show/:id", function (req, res) {
  Container.find({ id: req.params.id }, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

router.get("/del/:id", async (req, res) => {
  try {
    await Container.deleteMany({ id: req.params.id });
    await Timer.deleteMany({ id: req.params.id });
    return res.status(200).json({ success: true, msg: "Product Deleted" });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
