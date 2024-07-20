const userModel = require('../models/userModel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// password Convert into hash

const securePassword = async (password) => {
    try {
        const passwordHash = await bcryptjs.hash(password, 10);
        return passwordHash;
    } catch (error) {
       return res.status(400).json(error.message);
    }
};


// Create User token 

const create_token = async (id) => {
    try {
        const token = await jwt.sign({ _id: id }, config.secret_jwt);
        return token;
    } catch (error) {
       return res.status(400).json(error.message);
    }
};


// User update-password method 

const update_password = async (req, res) => {
    try {
        const user_id = req.body.user_id;
        const password = req.body.password;

        const data = await userModel.findOne({ _id: user_id });

        if (data) {
            const newPassword = await securePassword(password);

           const  userdata = userModel.findByIdAndUpdate({ _id: user_id }, { $set: { password: newPassword } });

           return res.status(200).json({ sucess: true, msg: "your password has been updated" });
        } else {

           return res.status(200).json({ sucess: false, msg: "User id not found" });
        }
    } catch (error) {
        res.status(400).json(error.message);
    }

};

module.exports = {
    update_password
}
