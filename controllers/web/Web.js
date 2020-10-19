const path = require('path');

const fs = require('fs');

const mongoose = require('mongoose');

const Joi = require('joi');


const rootDirectory = path.resolve("./");

class Web {

    constructor(req, res) {

    
        this.req = req;
        this.res = res;
        this.userModel = mongoose.model('users');
    }



     index() {


        this.userModel.find().sort({date:-1}).exec((err, doc) => {
            if (!err) {


                this.res.status(200).render('index', { data: doc });
            }
            else {

                this.res.status(500).send('something went wrong')
            }
        })


    }


    insetData() {

        const schema = Joi.object({
            name: Joi.string().trim().required(),
            role: Joi.string().trim().required()
        });

        let { error, value, warning } = schema.validate(this.req.body);

        if (error) 
        {
            let errorMessage = error.details[0].message.replace(/"/g, '');

            this.res.status(400).redirect('/?error=' + encodeURIComponent(errorMessage));
        }
        else {

           
            value.date = Date();

            const users = new this.userModel(value);

            users.save((err, res) => {
                if (!err) {

                    
                    this.res.status(200).redirect('/?message=' + `Record added successfully with ID ${res._id}`)
                }
                else {

                    this.res.status(500).redirect('/?error=' + "An error coccured while inserting the data")
                }
            })
        }



    }

    editInfo() {


        let id = this.req.params.id;

        this.userModel.findOne({ _id: id }, (err, res) => {
            if (!err) {


                this.res.status(200).render('info', { data: res });
            }
            else {
                this.res.status(500).send('Something went wrong');
            }
        })


    }


    deleteData() {

        let id = this.req.params.id;

       
        this.userModel.deleteOne({ _id: id}, (err) => {
            if (!err) {

                this.res.status(200).redirect('/?message=' + "Record deleted successfully")
            }
            else {

                this.res.status(500).redirect('/?error=' + "An error coccured while deleting the data")
            }
        })
    }


    updateInfo() {

        const user = new this.userModel();

        let id = this.req.params.id;

        const schema = Joi.object({
            name: Joi.string().trim().required(),
            role: Joi.string().trim().required()
        });

        let { error, value, warning } = schema.validate(this.req.body);

        if (error) {
            let errorMessage = error.details[0].message.replace(/"/g, '');


            this.res.status(400).redirect(this.req.path + `?error=${encodeURIComponent(errorMessage)}`)
        }



        else {

            
            this.userModel.updateOne({_id:id}, { $set:value }, (err, res) => {
                if (!err) 
                {
                    this.res.status(200).redirect(this.req.path + `?message=Record updated successfully`);
                }
                else {

                    this.res.status(500).status.redirect(this.req.path + `?error=An error coccured while updating the data`);

                }
            })
        }

    }





}

module.exports = Web;