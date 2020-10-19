const  mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name :  {
        type:  String,
        required:  "Required"
    }, 

    role :  {
        type: String,
        required: "Required"

    },

    date:  {
        type: Date,
        required: "Required"
    }

});


mongoose.model("users", UserSchema);




