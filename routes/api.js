const express = require("express"),
  router = express.Router(),
  mongoose = require("mongoose");
require("../mongo/mongo");
require("../mongo/model/User");

const User = mongoose.model("User");

router.get("/api/data", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    console.log(`error occcured ${err}`);
  }
});

router.post("/api/data", async (req, res) => {
  try {
    const user = new User();
    (user.name = req.body.name),
      (user.rcpname = req.body.rcpname),
      (user.recipe = req.body.recipe);
    await user.save();
    res.send(user);
    res.json({ msg: "user created" });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Note."
    });
  }
});

router.put("/api/data/:id", async (req, res) => {
  try {
    const user = User.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true
    });
    res.send(user);
  } catch (err) {
    console.log(`error occcured ${err}`);
  }
});

router.delete("/api/data/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndRemove({ _id: req.params.id });
    res.send(user).status(200);
    res.json(user);
  } catch (err) {
    console.log(`error occcured ${err}`);
  }
});

module.exports = router;
