"use strict";

const users = require("../models/users-model");
const bcrypt = require("bcrypt");
const base64 = require("base-64");

async function basicAuth(req, res, next) {
  // its a middleware to encrypt the password and then send it to the method in the user 

  const encodedPassword=req.headers.authorization.split(' ')[1]// we use splite because as a result the req.headers.au contains two part and we want to delete the first [1] 
  console.log(encodedPassword,"=================================");

  const [username,password]=base64.decode(encodedPassword).split(':');
  console.log([username,password]); // we reverse the password and seperated the keys now we'll send these two variables to the mehod inside the (user model ) and there we can compare it with the hashed one and then validate the user

  users.authenticationBase(username,password).then(validatUser =>{
 console.log(req)
   req.user=validatUser;
   next();
  }).catch(err =>{next(' user not valid')})
  
}

module.exports=basicAuth;