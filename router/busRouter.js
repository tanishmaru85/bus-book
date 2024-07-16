const express = require('express');
const app = express();
const router = express.Router();

const bus_controller = require('../controllers/busController');
const auth = require('../middleware/auth');

router.post('/booking',auth,bus_controller.user_booking);


module.exports = router;
