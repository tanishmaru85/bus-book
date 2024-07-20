const Bus = require('../models/busModel');

const createBus = async (req, res) => {
  try {
    const newBus = await Bus.create(req.body);
    res.status(201).json({ sucess: true, newBus });
  } catch (error) {
    res.status(400).json({ sucess: false, message: error.message });
  }
};

const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.status(200).json({ sucess: true, buses });
  } catch (error) {
    res.status(500).json({ sucess: false, message: error.message });
  }
};

const getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.body._id);
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }
    res.status(200).json({ sucess: true, bus });
  } catch (error) {
    res.status(500).json({ sucess: false, message: error.message });
  }
};

const getSeatsAvailability = async (req, res) => {
  try {
    const bus = await Bus.findOne({ bus_name: req.body.bus_name });

    if (!bus) {
      return res.status(400).json({ message: 'Bus not found' });
    }

    const totalSeats = bus.total_seats;
    const bookedSeats = bus.booked_seats.length;
    const availableSeats = totalSeats - bookedSeats;

    res.status(200).json({ sucess: true, totalSeats, bookedSeats, availableSeats });

  } catch (err) {
    res.status(400).json({ sucess: false, message: err.message });
  }
};

// ticket booking 

const book_seat = async (req, res) => {
  const bus = await Bus.findOne({ bus_name: req.body.bus_name });
  const { seatNumber } = req.body;
  
  try {
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }
    
    // Check if seat is already booked
    if (bus.booked_seats.includes(seatNumber)) {
      return res.status(400).json({ message: 'Seat is already booked' });
    }
    
    // Book the seat
    bus.booked_seats.push(seatNumber);
    const result = await bus.save();
    
    res.status(200).json({ success: true, message: `Seat ${seatNumber} booked successfully` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    
  }
};

// cancel ticket

const cancel_seat = async ( req , res) => {
  try {
    const bus = await Bus.findOne({ bus_name: req.body.bus_name });
    const { seatNumber } = req.body;

    const cancel_booking = bus.booked_seats.indexOf(seatNumber);
    if (cancel_booking === -1) {
      return res.status(400).json({ message: 'Seat is not booked' });
    }

    bus.booked_seats.splice(cancel_booking, 1);
    const result = await bus.save();

    res.status(200).json({ success: true, message: `Seat ${seatNumber} canceled successfully` }); 
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}



module.exports = {
  createBus,
  getAllBuses,
  getBusById,
  getSeatsAvailability,
  book_seat,
  cancel_seat
}