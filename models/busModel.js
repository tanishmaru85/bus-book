const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
                                 
    busName: {
        type: String,
        require: true,
    },

    form: {
        type: String,
        require: true,
    },

    to: {
        type: String,
        reaquire: true,
    },


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

    seatNo: [{
        type: String,
        require: true,
    }],

    bookingDate: { 
        type: Date, 
        default: Date.now 
    }
});

const busModel = mongoose.model('booking', busSchema);
module.exports = busModel;