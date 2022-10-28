// const express = require("express");
import express from 'express';
const router = express.Router();
// const db = require("./../module/db");
import db from '../module/db';

type User = {
  firstName: String;
  lastName: String;
  age: Number
}
router.get("/:id", getUsers, (req, res: any) => {
  // inner function shouldn't be exposed to the HTTP protocol
  // getUsetById(id: string) => user
  res.json(res.user );
});

router.post("/", async (req, res) => {
  const { firstName, lastName, age } = req.body;
  // let Db = new db({
  //   firstName: firstName,
  //   lastName: lastName,
  //   age: age,
  // });
  const user = {
    firstName,
    lastName,
    age,
  }
  // saveUser(user)

  try {
    // Db = await Db.save();
    const status = await saveUser(user);
    if (status === "success") {
      //success
      return res.status(201).json(user);
    }
    return res.status(500).json({
      message: 'error while saving user'
    });
  } catch (err) {
    // add 5xx status
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

const saveUser = async (user: User) => {
  const Db = new db(user)
  return Db.save();
}


module.exports = router;
