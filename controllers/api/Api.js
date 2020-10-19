
const fs = require('fs');

const mongoose = require('mongoose');

const Joi = require('joi');



 class Api 
{

    constructor(req, res)
    {
        this.req = req;
        this.res = res;

    }


     start() {

        this.res.status(200).json(this.req.body)
        
    }
}


module.exports = Api;