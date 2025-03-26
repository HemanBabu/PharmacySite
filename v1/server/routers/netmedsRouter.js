const express = require("express");
const router = express.Router();

const {searchProduct, getProduct} = require("../controllers/netmedsControllers.js");

router
.get("/:query", searchProduct)
.get("/id/:id", getProduct);

module.exports = router;