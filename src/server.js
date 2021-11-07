'use strict';

const express =require('express');
const app = express();
const PORT=8000
require('dotenv').config();
const router=require('./auth/ router');
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use(router);


function start(){
      app.listen(PORT,()=>{
    console.log(`The server is on ${PORT}` )
})
}


module.exports={
    server:app,
    start:start,
   

}

