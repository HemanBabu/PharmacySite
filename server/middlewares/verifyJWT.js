const jwt = require("jsonwebtoken");
const invalidTokensModel = require("../models/invalidTokensModel.js");
async function verifyJWT(req, res, next){
    const authHeader = req.headers["authorization"];
    if(!authHeader){
        res.status(401).json({
            message : "pls provide bearer token"
        });
        return;
    }
    const JWT_SECRET = process.env.JWT_SECRET;
    const token = authHeader.split(" ")[1];
//    console.log(token);
    if(await invalidTokensModel.exists({token})){
        res.status(401).json({
            message : "not logged in"
        });
        return;
    }
    try{
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload.user;
        req.token = token;
        next();
    }catch(e){
        res.status(401).json({
            message : e.message
        });
        return;
    }
}

module.exports = verifyJWT;