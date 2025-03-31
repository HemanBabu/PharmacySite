const userDataModel = require("../models/userDataModel.js");
async function addToCart(req, res){
    try{
        const data = await userDataModel.updateOne(
            {user : req.user},
            {$set : { [`cart.${req.body.product_code}`] : req.body.count}}
        );
        return res.status(200).json({
            msg : 'added to cart'
        });
    }catch(e){
        return res.status(401).json({
            msg : "couldn't add to cart"
        });
    }
}
async function showCart(req, res){
    try{
        const userData = await userDataModel.findOne({user : req.user});
        const fetchProductsFromCache = require("../helper/fetchProductsFromCache.js");
        const inCartProducts = await fetchProductsFromCache(...userData.cart.keys());
        const counts = Array.from(userData.cart.values());
        for(let i=0; i<inCartProducts.length; i++){
            if(inCartProducts[i].toObject) inCartProducts[i] = inCartProducts[i].toObject();
            inCartProducts[i].count = counts[i];
        }
        res.status(200).json(inCartProducts);
        return;
    } catch(e){
        console.log(e);
        res.status(401).json({
            msg : "cant find user data"
        })
        return;
    }
}
async function modifyItemCount(req, res){
    try{
        const data = await userDataModel.updateOne(
            {user : req.user},
            {$set : {[`cart.${req.body.id}`] : req.body.count}}
        );
        res.status(200).json({
            msg : "modified cart item"
        })
        return;
    } catch(e){
        res.status(401).json({
            msg : "cant modify cart item"
        });
        return;
    }
}
async function deleteItem(req, res){
    try{
        const data = await userDataModel.updateOne(
            {user : req.user},
            {$unset : {[`cart.${req.body.product_code}`] : ""}}
        );
        res.status(200).json({
            msg : "deleted item"
        });
        return;
    } catch(e){
        res.status(401).json({
            msg : "cant delete item"
        });
        return;
    }
}
async function placeOrder(req, res){
    try{
        const data = await userDataModel.updateOne(
            {user : req.user},
            {$set : {cart : {}}}
        );
        return res.status(200).json({
            msg : "order placed"
        });
    } catch(e){
        return res.status(401).json({
            msg : "cant place order"
        });
    }

}

module.exports = {addToCart, showCart, modifyItemCount, deleteItem, placeOrder};
