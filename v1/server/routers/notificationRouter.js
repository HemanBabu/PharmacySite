const express = require("express");
const router = express.Router();

const {getNotifications} = require("../controllers/notificationRouter.js");
const verifyJWT = require("../middlewares/verifyJWT.js");

router
.get("/", verifyJWT, getNotifications);

module.exports = router;