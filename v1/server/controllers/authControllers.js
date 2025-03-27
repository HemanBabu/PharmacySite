const userModel = require("../models/userModel.js");
const invalidTokensModel = require("../models/invalidTokensModel.js");
const jwt = require("jsonwebtoken");
const verifyJWT = require("../middlewares/verifyJWT.js");

async function signup(req, res){
    if(await userModel.exists({user : req.user})){
        res.status(401).json({
            msg : "user already exists"
        });
        return;
    }
    try{
        await userModel.create({user : req.body.user, password : req.body.password});
    } catch(e){
        res.status(401).json({
            msg : "failed creating user"
        });
        console.log(e);
        return;
    }
    res.status(200).json({
        msg : "user created"
    });
}
async function login(req, res){
    const dbQuery = {
        user : req.body.user,
        password : req.body.password
    };
    if(!(await userModel.exists(dbQuery))){
        res.status(401).json({
            msg : "wrong credentials"
        });
        return;
    }
    try{
        const token = jwt.sign({user :dbQuery.user}, process.env.JWT_SECRET, {expiresIn : '2d'});
        res.status(200).json({
            token
        });
        return;
    } catch(e){
        res.status(401).json({
            msg : "invalid json token"
        });
        return;
    }
}
async function logout(req, res){
    if(await(invalidTokensModel.exists({token : req.body.token}))){
        res.status(401).json({
            msg : "already logged out"
        });
        return;
    }
    try{
        await invalidTokensModel.create({token : req.token});
        res.status(200).json({
            msg : "logged out"
        })
        return;
    } catch(e){
        console.log(e);
        res.status(401).json({
            msg : "could'nt log out"
        });
        return;
    }
}

module.exports = {signup, login, logout};