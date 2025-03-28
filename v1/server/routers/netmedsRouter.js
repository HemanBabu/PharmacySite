const express = require("express");
const router = express.Router();

const {searchProducts, getProduct} = require("../controllers/netmedsControllers.js");

router
.get("/:query", searchProducts)
.get("/id/:id", getProduct);

module.exports = router;