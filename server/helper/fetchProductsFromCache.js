const productModel = require("../models/productModel.js");
module.exports = async function fetchProductsFromCache(...productCodes){
    const products = [];
    for(const productCode of productCodes){
        try{
            console.log("Fetching from cache : " + productCode);
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
    return products;
}