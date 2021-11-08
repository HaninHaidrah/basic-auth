'use strict'
const {sequelize} = require('./src/auth/models/index');
const {start} = require('./src/server');

sequelize.sync().then(()=>{

    start()
})



