const express = require("express");

const app= express();

const port = 8000

const admin = (req, res)=>{
    return res.send("Admin DAshboard");
};

const isAdmin = (req,res,next)=>{
    console.log("isADmin is running")
    next()
}
const isloggedIn = (req,res,next)=>{
    console.log("loggedin user")
    next()
}
app.get('/admin',isloggedIn,isAdmin, admin);


app.get('/', (req, res)=>{
    return res.send("this is home");
})

app.get('/login', (req, res)=>{
    return res.send("You are at login its quarantine");
})
app.get('/dipesh', (req, res)=>{
    return res.send("You are at dipesh its quarantine");
})
app.get('/signup', (req, res)=>{
    return res.send("You are at signup its quarantine");
})
app.listen(port,()=>{
    console.log("server is up and running...");
})

// const port = 3000

// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

