'use strict'

require('dotenv').config();
const {Sequelize, DataTypes} = require('sequelize');


const POSTGRES_URI = process.env.NODE_ENV  === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

let sequelizeOptions = process.env.DATABASE_URL === 'production' ? {
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        }
      }
} : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions )
const usersModel = require('./users-model')
console.log(`usersModel:${usersModel}`)

const users = usersModel(sequelize, DataTypes)
console.log(`===================:${users}`)



module.exports = {
    db : sequelize,
    Users : users
}