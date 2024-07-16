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
        res.status(400).json(error.message);
    }
};

// Create User token 

const create_token = async (id) => {
    try {
        const token = await jwt.sign({ _id: id }, config.secret_jwt);
        return token;
    } catch (error) {
        res.status(400).json(error.message);
    }
};

// User admin Method

const register_user = async (req, res) => {
    try {

        const sPassword = await securePassword(req.body.password);

        const user = new userModel({
            userName: req.body.userName,
            email: req.body.email,
            password: sPassword
        });

        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser) {
            res.status(200).json({ sucess: false, msg: "This email is already exists" })
        } else {
            const userdata = await user.save();
            res.status(200).json({ sucess: true, data: userdata });
        }

    } catch (error) {
        res.status(400).send(error.message);

    }
};

// User login method 

const user_login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const loginData = await userModel.findOne({ email });
        if (loginData) {
            const passwordMatch = await bcryptjs.compare(password, loginData.password);
            if (passwordMatch) {
                const tokenData = await create_token(loginData._id);
                const userResult = {
                    _id: loginData._id,
                    email: loginData.email,
                    password: loginData.password,
                    token: tokenData
                }

                const response = {
                    sucess: true,
                    msg: "Sucessfully loged-in",
                    data: userResult
                }
                res.status(200).json(response);
            } else {
                res.status(200).json({ sucess: false, msg: "Login detatile are incorrect" });

            }
        } else {
            res.status(200).json({ sucess: false, msg: "email or password are incorrect" });

        }

    } catch (error) {
        res.status(400).json(error.message);

    }
};


module.exports = {
    register_user,
    user_login,
}