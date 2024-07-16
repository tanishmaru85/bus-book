const express = require('express');
const app = express();

app.use(express.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bus');

const user_router = require('./router/userRouter');
const bus_router = require('./router/busRouter');

// for user admin or login

app.use('/api', user_router);
app.use('/api', user_router);

// for updates password

app.use('/api', user_router);
app.use('/api', user_router);
app.use('/api', user_router);

// for bus booking 

app.use('/api', bus_router);
app.use('/api', bus_router);



app.listen(5000, () => {
    console.log(`connect to localhost port ${5000}`);
});
                                                                                  