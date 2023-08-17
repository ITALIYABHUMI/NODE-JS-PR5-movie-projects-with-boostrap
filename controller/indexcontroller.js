const admintbl = require('../models/form');
const path = require('path');
const fs = require('fs');

const index = (req, res) => {
        return res.render('index')
}

const insertdata = (req, res) => { 
    let image="";
    console.log(req.file);
    if(req.file){
        image=req.file.path;
    } 
    const{name, price,description } = req.body;
    admintbl.create({
        name: name,
        price: price,
        image:image,
        description:description,
    }).then((success) => {
        console.log("server is start");
        return res.redirect('back');
    }).catch((err) => {
        console.log(err);
        return false;
    })
}

const viewdata = (req, res) => {
    admintbl.find({}).then((success) => {
        return res.render('show',{
            record:success
        })
    }).catch((err) => {
        console.log(err);
        return false;
    })
}


const editdata = (req, res) => {
    id = req.query.id;
    admintbl.findById(id).then((success) => {
        return res.render('edit', {
            data: success
        });
    }).catch((err) => {
        console.log(err);
        return false;
    })
}

const deletedata =  (req, res) => {
    id = req.query.id;
    admintbl.findByIdAndDelete(id).then((success) => {
        fs.unlinkSync(success.image)
        console.log("Record successfully deleted");
        return res.redirect('back');
    }).catch((err) => {
        console.log(err);
    })
}  
// const updatedata = (req, res) => {
//     id = req.body.editid;
//     console.log(id);
//     const { name, price,description } = req.body;
//     admintbl.findByIdAndUpdate(id,{
//         name:name,
//         price:price,
//         description:description
//     }).then((success) => {
//         return res.redirect('/viewdata');
//     }).catch((err) => {
//         console.log(err);
//         return false
//     })
// }

const updatedata = (req, res) => {
    id = req.body.editid;
    console.log(req.body);
    const{name, price,description } = req.body;
    if(req.file){
        admintbl.findById(id).then((oldimage) => {
            fs.unlinkSync(oldimage.image);
            let image = req.file.path;
            admintbl.findByIdAndUpdate(id,{
                name: name,
                price: price,
                image:image,
                description:description
            }).then((success) => {
                console.log("Record successfully deleted");
                return res.redirect('/viewdata');
            }).catch((err) => {
                console.log(err);
                return false;
            })
        }).catch((err) => {
            console.log(err);
            return false;
        }) 
    }
    else{
        admintbl.findById(id).then((oldimage) => {
            let image = oldimage.path;
            admintbl.findByIdAndUpdate(id,{
                name: name,
                price: price,
                image:image,
                description:description 
            }).then((success) => {
                console.log("Record successfully deleted");
                return res.redirect('/viewdata');
            }).catch((err) => {
                console.log(err);
                return false;
            })
        }).catch((err) => {
            console.log(err);
            return false;
        }) 
    } 
}


module.exports={
    index,
    insertdata,
    viewdata,
    editdata,
    deletedata,
    updatedata
}