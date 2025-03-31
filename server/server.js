const express = require("express");
const mongoose = require('mongoose');
const authRouter = require("./routers/authRouter.js");
const netmedsRouter = require("./routers/netmedsRouter.js");
const wishlistRouter = require("./routers/wishlistRouter.js");
const cartRouter = require("./routers/cartRouter.js");
const notificationRouter = require("./routers/notificationRouter.js");
const app = express();
const cors = require("cors");

require("dotenv").config();
console.log(process.env.JWT_SECRET);
const DB_URI = "mongodb+srv://"+process.env.DB_CREDS+"@cluster0.paepdlt.mongodb.net/pharmacysite?retryWrites=true&w=majority&appName=Cluster0"
async function connectDB(){
    try{
        await mongoose.connect(DB_URI);
    } catch (e){
        console.log(e);
        process.exit(0);
    }
}
connectDB();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/search", netmedsRouter);
app.use("/wishlist", wishlistRouter);
app.use("/cart", cartRouter);
app.use("/notifications", notificationRouter);

app.listen(3001, "localhost", ()=>{
    console.log("listening");
    console.log("localhost:3001");
})