const express = require('express');

const route = express.Router();

const path = require('path')


//controllers
const Web = new require(path.resolve('./controllers/web/Web'));

const API = require(path.resolve('./controllers/api/Api'))


//routes

//API Routes
route.get('/api', (req, res) => {

    return new API(req, res).start();

})

//Web Routes

route.get('/', (req, res) => {

    return new Web(req, res).index();


}).post('/', (req, res) => {

    return new Web(req, res).insetData();

});



route.get('/edit-info/:id', (req, res) => {

    return new Web(req, res).editInfo();

}).post('/edit-info/:id', (req, res) => {

    return new Web(req, res).updateInfo();

});


route.get('/delete-info/:id', (req, res) => {

    return new Web(req, res).deleteData();

});


module.exports = route;