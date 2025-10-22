import express from "express";
import fs from "fs";

const app = express();

app.use(express.static("./public"));
app.use(express.json());


app.get("/world", async (req,res)=>{
    try {
        let fileContents = fs.readFileSync("./world.json", "utf-8");
        let world = JSON.parse(fileContents);
        res.json(world);
    } catch (error) {
        console.error(error);
    }
});
    
app.post("/world", (req, res) => {
    let world;
    try{
        let fileContents = fs.readFileSync("./world.json", "utf-8");
        world = JSON.parse(fileContents)
        for(let region of world.region){
            for(let town of region.towns){
                for(let person of town.notable_people){
                    if(person.name === req.body.nameInput){
                        person.friends.push(req.body.newFriend)                    
                    }
                }
            }
        }
        fs.writeFileSync("./world.json", JSON.stringify(world, null, 2));    
    } catch (error){
        console.log(error);
    }
    res.send(world.region)
});

app.listen(3000);