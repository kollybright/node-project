const mongoose = require('mongoose');

//db connection

mongoose.connect(
    'mongodb+srv://kollybright:Kollybright_123@test.hbofp.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
)

const connection = mongoose.connection;

    connection.on('error', () => {

        console.error.bind(console, 'connection error:')


    });


    connection.once('open', function () {
        console.log('connection established')
    });


const User = require('./User');








