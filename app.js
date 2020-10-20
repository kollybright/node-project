const express = require('express');

const path = require('path');

const fs = require('fs')

const routes = require('./routes/routes');

const mongoose = require('mongoose')

const db = require('./models/index')

const bodyParser = require('body-parser');

const cors = require('cors');


const app = express();

app.use('/public', express.static(path.join(__dirname, 'assets')));

app.use(function (req, res, next) {
    res.locals.query = req.query;
    res.locals.params = req.params;
    res.locals.url = req.originalUrl;

    next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use((req, res, next) => {

    logRequest(req)

    next();
});



app.use(cors());

app.use('/', routes);


app.set('view engine', 'ejs');



app.listen(3000)


function logRequest(req) {

    let body = JSON.stringify(req.body);


    let logData = `\n--------------------------------------------------\nBody:${body}\nIP:${getCallerIP(req)}\n--------------------------------------------------`;

    fs.appendFile('./logs/users.log', logData, (err) => {

        if (err) {
            console.log(err)
        }
        else {
            //     console.log("Logged successfully")
        }
    })
}

function getCallerIP(request) {
    var ip = request.headers['x-forwarded-for'] ||
        request.connection.remoteAddress ||
        request.socket.remoteAddress ||
        request.connection.socket.remoteAddress;
    ip = ip.split(',')[0];
    ip = ip.split(':').slice(-1); //in case the ip returned in a format: "::ffff:146.xxx.xxx.xxx"
    return ip;
}