import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();

app.use(express.static("./public"));
app.use(express.json());
app.use(cors());

app.get("/player_info", async (req,res)=>{
    try {
        let fileContents = fs.readFileSync("./player_info.json", "utf-8");
        let player_info = JSON.parse(fileContents);
        res.json(world);
        console.log(player_info)
    } catch (error) {
        console.error("whoops:", error);
    }
});
    
app.post("/world", (req, res) => {
    let player_info;
    try{
        let fileContents = fs.readFileSync("./player_info.json", "utf-8");
        player_info = JSON.parse(fileContents)
        console.log(player_info)
    } catch (error){
        console.log("whoops:", error);
    }
});

app.listen(3000);