const express = require("express");
const authRouter = require("routers/authRouter.js");
const netmedsRouter = require("routers/netmedsRouter.js");
const wishlistRouter = require("routers/wishlistRouter.js");
const cartRouter = require("routers/cartRouter.js");
const notificationRouter = require("routers/notificationRouter.js");

const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/search", netmedsRouter);
app.use("/wishlist", wishlistRouter);
app.use("/cart", cartRouter);
app.use("/notification", notificationRouter);

app.listen(3001, "localhost", ()=>{
    console.log("listening");
})