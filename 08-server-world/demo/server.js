import express from "express";
import fs from "fs";

//Create an instance of the express server
const app = express();

//This says "Go stick this stuff in a folder called public"
//So you need to make a folder called public that has the front end inside of it
app.use(express.static("./public"));
app.use(express.json());

//Whenever the server gets a request for localhost/api/randomNumber, it will call this funtion
app.get("/api/randomNumber", (req,res)=>{
    res.send(Math.random());
});

app.post("/api/add", (req,res)=>{
    console.log(req.body);

    req.body.name += "!!!";

    res.json(req.body);
});

app.listen(3000);