const mongoose = require('mongoose');

const adminSchema  = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
});


const admin = mongoose.model('admin',adminSchema);

module.exports = admin;

                                                                                           