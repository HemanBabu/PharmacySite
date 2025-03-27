const mongoose = require("mongoose")
const userDataSchema = new mongoose.Schema({
    user : {
        type : String,
        required: true, 
        unique: true
    },
    cart : {
        type : [String], 
        default : []
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
        default : []
    }
});

modules.export = new mongoose.model("user-data", userDataSchema);