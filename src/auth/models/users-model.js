"use strict";
const { sequelize, DataTypes } = require("./index");
const bcrypt = require("bcrypt");

const Users = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// add method to compare the hashed pass and user :
Users.authenticationBase = async function (username, password) {
  // compare the pass that we got it from middleware
  //1. get the user info from db:
  const user = await Users.findOne({ where: { username: username } });
  const validUser = await bcrypt.compare(password, user.password);

  if (validUser) {
    return user;
  } else {
    throw new Error("invalid user");
  }
};

module.exports = Users;
