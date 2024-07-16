const userModel = require('../models/userModel');
const sgMail = require('@sendgrid/mail');
const randomstring = require('randomstring');
const bcryptjs = require('bcryptjs');
const config = require('../config/config');
const API_KEY = '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';

const securePassword = async (password) => {
    try {
        const passwordHash = await bcryptjs.hash(password, 10);
        return passwordHash;
    } catch (error) {
        res.status(400).json(error.message);
    }
};

const sendResetPasswordEmail = async (userName, email, token) => {
    try {
     
        sgMail.setApiKey(API_KEY);

        const massage = {
            from: "vadhwanimish@gmail.com",
            to: "tanishmaru85@gmail.com",
            subject: "Password Reset Request",
            html: `<p>Hello ${userName},</p>
            <p>Please click the following link to reset your password:</p>
            <p><a href="http://localhost:5000/api/reset_password?token=${token}">Reset Password</a></p>`
        };

        console.log('running');

        await sgMail.send(massage, (error, info) => {
            if (error) {
            //  console.log(error);
            }
            console.log('Reset password email sent successfully');
        });

    } catch (error) {
        console.log({ message: error.message });
    }
};

const forget_password = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, msg: "Email not found" });
        }

        const token = randomstring.generate();
        user.token = token;
        await user.save();

        await sendResetPasswordEmail(user.userName, user.email, token);

        res.status(200).json({ success: true, msg: "Password reset email sent" });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

const reset_password = async (req, res) => {
    try {
        const { token } = req.query;
        const { password } = req.body;

        const user = await userModel.findOne({ token });

        if (!user) {
            return res.status(404).json({ success: false, msg: "Invalid or expired token" });
        }

        const newPassword = await securePassword(password);
        user.password = newPassword;
        user.token = '';
        await user.save();

        res.status(200).json({ success: true, msg: "Password reset successfully" });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

module.exports = {
    forget_password,
    reset_password
};


