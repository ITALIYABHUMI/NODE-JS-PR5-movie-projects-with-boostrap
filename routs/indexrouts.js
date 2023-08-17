const { log } = require('console');
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const routes = express.Router();

const file=multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,'uploads/')},
    filename:(req,file,cb)=>{
        cb(null,file.originalname)}
    })

    const imagedata = multer({storage:file}).single('image');

const admincontroller = require('../controller/indexcontroller')

routes.get('/',admincontroller.index);
routes.post('/insertdata',imagedata,admincontroller.insertdata);
routes.get('/viewdata',admincontroller.viewdata);
routes.get('/editdata',admincontroller.editdata);
routes.get('/deletedata',admincontroller.deletedata);
routes.post('/updatedata',imagedata,admincontroller.updatedata);

module.exports = routes;