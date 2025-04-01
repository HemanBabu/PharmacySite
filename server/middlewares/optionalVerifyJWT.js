const verifyJWT = require("./verifyJWT.js");

function optionalVerifyJWT(req, res, next){
    const token = req.headers["authorization"]?.split(" ")[1];
    if(token && token!="null") verifyJWT(req, res, next);
    else next();
}

module.exports = optionalVerifyJWT;