const userDataModel = require("../models/userDataModel.js");
async function getNotifications(req, res){
    try{
        const userData = await userDataModel.findOne({user : req.user});
        res.status(200).json(
            userData.notifications
        );
    } catch (e){
        res.status(401).json({
            msg : "cant find user in db"
        });
    }
}
module.exports = {getNotifications}