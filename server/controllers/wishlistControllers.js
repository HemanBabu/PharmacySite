const mongoose = require("mongoose");
const userDataModel = require("../models/userDataModel.js")

async function addToWishlist(req, res){
    const userData = await userDataModel.findOne({user : req.user});
    if(userData.wishlist.includes(req.body.product_code)){
        return res.status(200).json({
            msg : "already in wishlist"
        });
    }
    try{
        await userDataModel.updateOne(
            {user : req.user},
            { $push : {wishlist : req.body.product_code}}
        );
        return res.status(200).json({
            msg : "added to wishlist"
        });
    } catch(e){
        return res.status(401).json({
            msg : "cant add to wishlist"
        });
    }
}
async function fetchWishlist(req, res){
    try{
        const {wishlist} = await userDataModel.findOne( {user : req.user});
        const fetchProductsFromCache = require("../helper/fetchProductsFromCache.js");
        const products = await fetchProductsFromCache(req.user, ...wishlist);
//        console.log(products);
        return res.status(200).json(products); 
    } catch(e){
        console.log(e);
        return res.status(401).json({
            msg : "cant fetch wishlist"
        });
    }
}
async function removeFromWishlist(req, res){
    try{
        await userDataModel.updateOne(
            {user : req.user},
            {$pull : {wishlist : req.body.product_code}}
        );
        return res.status(200).json({
            msg : "removed from wishlist"
        });
    } catch(e){
        return res.status(401).json({
            msg : "cant remove from wishlist"
        })
    }
}

module.exports = {addToWishlist,fetchWishlist,removeFromWishlist};
