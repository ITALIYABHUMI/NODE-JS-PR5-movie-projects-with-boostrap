const express = require('express');
const multer = require('multer');
const path = require('path');

const port = 6500;

const app = express();
  
app.set("view engine" , "ejs"); 
app.use(express.urlencoded());    
   
 
app.use('/uploads',express.static(path.join(__dirname,'uploads')))

const db = require('./config/mogoose');

app.use('/',require("./routs/indexrouts"))

app.listen(port,(err)=>{ 
    if(err){
        console.log("server  is not started");
        return false;
    }
    console.log("server is start : "+port);
})