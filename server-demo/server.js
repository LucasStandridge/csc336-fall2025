import express from "express";
import fs from "fs";

const app = express();

app.use(express.static("./public"));
app.use(express.json());

app.get("/world", async (req,res)=>{
    let world;
    try{
        let fileContents = fs.readFileSync("./world.json", "utf-8");
        world = JSON.parse(fileContents)
    } catch (error){
        console.log(error);
    }
    console.log(world.region[0].name);

    res.json(world);
});

app.listen(3000);