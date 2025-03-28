const productModel = require("../models/productModel.js");
async function searchProducts(req, res) {
    try{
        const response = await fetch("https://0z9q3se3dl-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(3.33.0)%3B%20Browser%3B%20instantsearch.js%20(4.49.1)%3B%20JS%20Helper%20(3.11.1)&x-algolia-application-id=0Z9Q3SE3DL&x-algolia-api-key=daff858f97cc3361e1a3f722e3729753",
            {
                body: {
                    "requests": [
                        {
                            "indexName": "prod_meds",
                            "params": "query="+req.body.query
                        }
                    ]
                }
            }
        );
        return res.status(200).json(await response.json());
    } catch (e){
        return res.status(401).json({
            msg : "couldnt search"
        })
    }
}
function getProduct(req, res) {
    try{
        const 
    }
}
module.exports = { searchProducts, getProduct };