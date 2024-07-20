const express = require('express');
const app = express();
const router = express.Router();

const bus_controller = require('../controllers/busController');
const auth = require('../middleware/auth');


// bus-booking system

router.post('/bus',bus_controller.createBus);
router.get('/buses',bus_controller.getAllBuses);
router.get('/:_id',bus_controller.getBusById);
router.get('/:_id/seats',bus_controller.getSeatsAvailability);
router.post('/booking-seat',auth,bus_controller.book_seat);
router.post('/cancel-seat',auth,bus_controller.cancel_seat);


module.exports = router;
