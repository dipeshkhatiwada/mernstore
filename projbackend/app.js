
require("dotenv").config();
const mongoose = require('mongoose');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// requiring auth for route
const authRoutes = require("./routes/auth")
// connetion
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, 
})
.then(()=>{
    console.log("DB CONNECTED");
});
// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
// My Routes
app.use("/api", authRoutes)

// port
const port = process.env.PORT || 8000;
// stating server
app.listen(port,()=>{
    console.log(`app is running at ${port}`);
})