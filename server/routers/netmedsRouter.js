const express = require("express");
const router = express.Router();

const {searchProducts, getProduct} = require("../controllers/netmedsControllers.js");
const optionalVerifyJWT = require("../middlewares/optionalVerifyJWT.js");

router
.get("/:query", optionalVerifyJWT, searchProducts)
.get("/id/:product_code", getProduct);

module.exports = router;