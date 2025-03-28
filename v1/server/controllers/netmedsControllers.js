const productModel = require("../models/productModel.js");
const cacheProducts = require("../helper/cacheProducts.js");
async function searchProducts(req, res) {
    try{
        const response = await fetch("https://0z9q3se3dl-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(3.33.0)%3B%20Browser%3B%20instantsearch.js%20(4.49.1)%3B%20JS%20Helper%20(3.11.1)&x-algolia-application-id=0Z9Q3SE3DL&x-algolia-api-key=daff858f97cc3361e1a3f722e3729753",
            {
                method : "POST",
                body: JSON.stringify({
                    "requests": [
                        {
                            "indexName": "prod_meds",
                            "params": "query="+req.params.query
                        }
                    ]
                })
            }
        );
        const sieve = ["product_code","display_name","manufacturer_id","manufacturer_name","availability_status","schedule","max_qty_in_order","mrp","selling_price","discount","in_stock","popularity","brand_id","brand","url_path","is_cold_storage","rx_required","pack_size","best_price","manufacturer_url_path","brand_url_path","rating_avg","image_url","thumbnail_url","imagerelative_url","categories"];
        let data = (await response.json());

        data = data.results[0].hits;
        const result = {};
        result.products = data.map(product => {
            const obj = {};
            for(const key of sieve){
                obj[key] = product[key];
            }
            return obj;
        });
        await cacheProducts(...result.products);
        result.length = result.products.length;
        return res.status(200).json(result);
    } catch (e){
        console.log(e);
        return res.status(401).json({
            msg : "couldnt search"
        });
    }
}
async function getProduct(req, res) {
    const fetchProductsFromCache = require("../helper/fetchProductsFromCache.js");
    const products = await fetchProductsFromCache(req.params.product_code);
    if(products[0]==-1){
        return res.status(401).json({
            msg : "no such product"
        });
    }
    console.log(products);
    return res.status(200).json(products[0]);
}
module.exports = { searchProducts, getProduct };