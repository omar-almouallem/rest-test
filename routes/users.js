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
    res.send(`User ${Db.firstName} Addede to db!` + Db);
  } catch (err) {
    res.send("errore : " + err);
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
    res.json(updateUser);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});
router.delete("/:id", getUsers, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Canote find this user" });
  }
});

async function getUsers(req, res, next) {
  try {
    let user = await db.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Canote find this user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
  res.user = user;
  next();
}
module.exports = router;
