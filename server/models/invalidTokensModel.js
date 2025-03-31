const mongoose = require("mongoose");
const invalidTokensSchema = new mongoose.Schema({
    token : {
        type: String,
        unique : true,
        required : true
    }
});

module.exports = new mongoose.model("invalid-tokens", invalidTokensSchema);