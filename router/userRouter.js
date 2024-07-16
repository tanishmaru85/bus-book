const express = require('express');
const app = express();
const router = express.Router();


const user_controller = require('../controllers/userController');

const update_controller = require('../controllers/updateController');

const forget_reset_controller = require('../controllers/forget_resetController');

const auth = require('../middleware/auth');


router.post('/admin', user_controller.register_user);

router.post('/login', user_controller.user_login);

router.post('/update_password', auth, update_controller.update_password);

router.post('/forget_password', forget_reset_controller.forget_password);

router.get('/reset_password' , forget_reset_controller.reset_password);




module.exports = router;


