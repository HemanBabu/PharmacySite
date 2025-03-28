const productModel = require("../models/productModel.js");
module.exports =  async function cacheProducts(...products){
    for(const product of products){
        try{
            await productModel.replaceOne(
                {product_code : product.product_code},
                product,
                {upsert : true}
            );
        } catch(e){
            console.log("couldn't update product "+product.product_code);
        }
    }
}