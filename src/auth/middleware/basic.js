"use strict";

const express = require("express");
const { Users } = require("../models/index");
const bcrypt = require("bcrypt");
const base64 = require("base-64");

async function basicAuth(req, res, next) {
  let basicHeaderParts = req.headers.authorization.split(" "); 
  let encodedString = basicHeaderParts.pop(); 
  let decodedString = base64.decode(encodedString);
  let [username, password] = decodedString.split(":"); 

  const user = await Users.findOne({ where: { username: username } });
  const valid = await bcrypt.compare(password, user.password);
  if (valid) {
    console.log(req);
    req.user = user;
    next();
  } else {
    next("Invalid User");
  }
}

module.exports = basicAuth;
