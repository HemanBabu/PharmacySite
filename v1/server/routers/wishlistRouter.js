const express = require("express");
const router = express.Router();

const {} = require("../controllers/wishlistRouter.js");
const verifyJWT = require("../middlewares/verifyJWT.js");

router
.post("/", verifyJWT, addToWishlist)
.get("/", verifyJWT, fetchWishlist)
.delete("/", verifyJWT, removeFromWishlist);

module.exports = router;