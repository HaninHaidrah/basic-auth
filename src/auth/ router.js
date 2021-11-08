"use strict";

const express = require("express");
const router = express.Router();
const users = require("../auth/models/users-model");
const bcrypt = require("bcrypt");
const authmiddleWare = require("../auth/middleware/basic");

router.post("/signup", toSignup);
router.post("/signin", authmiddleWare, signin);

async function toSignup(req, res) {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 2);
    const record = await users.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(403).send(error.message);
  }
}

async function signin(req, res) {
  res.status(200).json(req.user);
}

module.exports = router;
