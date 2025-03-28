const express = require("express");
const router = express.Router();

const {addToWishlist, fetchWishlist, removeFromWishlist} = require("../controllers/wishlistControllers.js");
const verifyJWT = require("../middlewares/verifyJWT.js");

router
.post("/", verifyJWT, addToWishlist)
.get("/", verifyJWT, fetchWishlist)
.delete("/", verifyJWT, removeFromWishlist);

module.exports = router;