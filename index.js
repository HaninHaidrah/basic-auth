'use strict'
const {db} = require('./src/auth/models/index');
const {start} = require('./src/server');

db.sync().then(()=>{

    start()
})



