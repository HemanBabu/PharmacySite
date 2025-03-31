const mongoose = require("mongoose")
const userDataSchema = new mongoose.Schema({
    user : {
        type : String,
        required: true, 
        unique: true
    },
    cart : {
        type : Map,
        of : Number,
        default : {}
    },
    wishlist : {
        type : [String], 
        default : []
    },
    notifications : {
        type : [{
            title : String,
            body : String
        }],
        default : [{
            title : "Welcome",
            body : "Get any medicine on doorsteps"
        }]
    }
});

module.exports = new mongoose.model("user-data", userDataSchema);