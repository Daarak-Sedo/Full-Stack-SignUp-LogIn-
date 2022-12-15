const express=require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const route = require("../src/routes/route");

const app= express()  

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/views",express.static("views"))    // for static Page

app.set("view engine","ejs")    // for Dynamic Page, we are EJS Engine

app.get("",(req,res)=>{
    res.render("index")        // "" & "/" - both are home Page , we can write anything
})

app.get("/",(req,res)=>{
    res.send("boom gus this is wprking")
})

app.get("/views/login.ejs",(req,res)=>{
    res.render("login")
 })

 app.get("/views/home.ejs",(req,res)=>{
    res.redirect("/")
 })


mongoose.connect("mongodb+srv://Bhuwan:fake2fake@cluster0.iq956rr.mongodb.net/sign_up?retryWrites=true&w=majority", {useNewUrlParser:true})
.then(()=> console.log("MongoDb is connected"))
.catch(err => console.log(err))

app.use('/',route)  // Global Middleware for all Router/Application

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});