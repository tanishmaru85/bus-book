const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({

    bus_name: {
        type: String,
        require: true,
        unique: true,
    },

    form: {
        type: String,
        require: true,
    },

    to: {
        type: String,
        reaquire: true,
    },
    total_seats: {
        type: Number,
        require: true,
    },
    booked_seats: [{
        type: Number,
        require: true,
    }],

    runningDays: [{
        type: String,
        require: true,
    }],

    runningTiming: {
        type: Number,
        require: true
    },

    price: {
        type: Number,
        require: true,
    },

    seatNumber: {
        type: Number,
        require: true
    },

    bookingDate : {
        type: Date,
        default: Date.now,
    },

});

const Bus = mongoose.model('buses', busSchema);
module.exports = Bus;
