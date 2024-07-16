const busModel = require('../models/busModel');

// Create a new bus ticket booking only for logged-in users

const user_booking = async (req, res) => {
  try {
    const busTicketBooking = new busModel({
      busName: req.body.busName,
      form: req.body.form,
      to: req.body.to,
      runningDays: req.body.runningDays,
      runningTiming: req.body.timing,
      price: req.body.price,
      seatNo: req.body.seats,
      bookingDate: req.body.booking
    });
    const result = await busTicketBooking.save();
    res.status(200).json({ sucess: true, msg: "Seat booking sucessfully", result });

  } catch (err) {
    res.status(500).json({ message: 'Error booking ticket' });
  }
  
};



module.exports = {
  user_booking
}