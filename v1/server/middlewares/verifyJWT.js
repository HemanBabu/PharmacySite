const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
function verifyJWT(req, res, next){
    const authHeader = req.headers["authorization"];
    if(!authHeader){
        res.status(401).json({
            message : "not logged in"
        });
    }
    const token = authHeader.split(" ")[1];
    try{
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload;
        next();
    }catch(e){
        res.status(401).json({
            message : e.message
        });
    }
}

module.exports = verifyJWT;