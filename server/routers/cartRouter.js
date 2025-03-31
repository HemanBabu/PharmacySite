const express = require("express");
const {addToCart, showCart, modifyItemCount, deleteItem, placeOrder} = require("../controllers/cartControllers.js");
const verifyJWT = require("../middlewares/verifyJWT.js");


const router = express.Router();
router
.post("/", verifyJWT, addToCart)
.get("/", verifyJWT, showCart)
.put("/", verifyJWT, modifyItemCount)
.delete("/", verifyJWT, deleteItem)
.get("/placeorder", verifyJWT, placeOrder);

module.exports = router;
