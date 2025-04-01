const productModel = require("../models/productModel.js");
module.exports = async function fetchProductsFromCache(user, ...productCodes){
    const products = [];
    for(const productCode of productCodes){
        try{
//            console.log("Fetching from cache : " + productCode);
            const document = await productModel.findOne( {product_code : productCode});
            if(document==null){
                console.log(productCode + " not cached");
                products.push({product_code : -1});
                continue;
            }
            products.push(document);
        } catch(e){
            console.log("could'nt fetch product code "+productCode);
            products.push({product_code : -1});
        }
    }
//    console.log(token);
    if(user){
//        console.log(token);
        const userSpecialize = require("./userSpecialize.js");
        return await userSpecialize(user, products);
    }
    return products;
}