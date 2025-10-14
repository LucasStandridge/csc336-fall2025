import express from "express";

const app = express();

const PORT = 3000;

let count = 0;
//Start a server on a specificed "port"
app.listen(PORT, (req, res)=>{
    console.log("Server started!");
});

app.get("/test", (req,res)=>{
    console.log("Someone made a get request with the 'test' endpoint");
    count++
    res.send("No way this is actually so cool. Server speaking!: " + count);
});