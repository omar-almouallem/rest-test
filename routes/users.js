const express = require("express");
const router = express.Router();
const db = require("./../module/db");

// all routes in here sterting in /users
router.get("/:id", getUsers, (req, res) => {
  res.json(res.user);
});

router.post("/", async (req, res) => {
  let Db = new db({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
  });
  try {
    Db = await Db.save();
    res.status(201).send(`User ${Db.firstName} Created Details :` + Db);
  } catch (err) {
    res.send("error : " + err);
  }
});
router.patch("/:id", getUsers, async (req, res) => {
  if (req.body.firstName != null) {
    res.user.firstName = req.body.firstName;
  }
  if (req.body.lastName != null) {
    res.user.lastName = req.body.lastName;
  }
  if (req.body.age != null) {
    res.user.age = req.body.age;
  }
  try {
    let updateUser = await res.user.save();
    res.send(`User ${updateUser.firstName} Update Details :` + updateUser);
  } catch (err) {
    res.status(400).json({ message: "Bad Request" });
  }
});
router.delete("/:id", getUsers, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

async function getUsers(req, res, next) {
  let user;
  try {
    user = await db.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Not Found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
  res.user = user;
  next();
}
module.exports = router;
