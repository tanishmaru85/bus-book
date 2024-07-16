const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    userName: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        require: true,
        unique: true,
    },

    password: {
        type: String,
        reaquire: true,
    },

    token:{
        type: String,
        default:''
    }
});


const userModel = mongoose.model('user', userSchema);
module.exports = userModel;