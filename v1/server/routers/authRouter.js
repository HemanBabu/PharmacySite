const express = require("express");
const router = express.Router();
const {signup, login, logout} = require("../controllers/authControllers.js");
const verifyJWT = require("../middlewares/verifyJWT.js");

router
.post("/signup", signup)
.post("/login", login)
.post("/logout", verifyJWT, logout);

module.exports = router;