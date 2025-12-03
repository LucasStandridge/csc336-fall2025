import express from "express";
import fs, { readFileSync } from "fs";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/Pokemon_Data", async (req,res)=>{
    try{
        console.log("get request received (users)");
        let file_contents = fs.readFileSync("./Pokemon_Data.json", "utf-8");
        let file_data = JSON.parse(file_contents);
        res.json(file_data);
        console.log("GET worked, Pokemon: ", file_data.length)
    }catch(err){
        console.log(err)
    }
});

app.get("/Users", async(req,res) =>{
    try{
        console.log("get request received (users)");
        let file_contents = fs.readFileSync("./Users.json", "utf-8");
        let file_data = JSON.parse(file_contents);
        res.json(file_data);
        console.log("User GET worked", file_data)
    }catch(err){
        console.log(err)
    }
});

app.post('/Pokemon_Data', (req, res) => {
    let file_data = ""
    try{
        console.log("post received, updatading JSON");
        let file_contents = fs.readFileSync("./Pokemon_Data.json", "utf-8");
        file_data = JSON.parse(file_contents);
        file_data.push(req.body);
        fs.writeFileSync("./Pokemon_Data.json", JSON.stringify(file_data,null,2));   
        console.log("File written, Pokemon: ", req.body.name)
    } catch (err) { 
        console.log("oops")
    }
    res.send(file_data)
});

app.post("/Users", (req,res) =>{
    let file_data = "";
    try{
        console.log("post recieved, updating JSON");
        let file_contents = fs.readFileSync("./Users.json", "utf-8");
        file_data = JSON.parse(file_contents);
        file_data.push(req.body);
        fs.writeFileSync("./Users.json", JSON.stringify(file_data,null,2));
        console.log("Users file written: ", req.body)
    }catch(err){
        console.log(err)
    }
    res.status(201).json(req.body);
    // res.send(file_data)
})

app.patch(`/Pokemon_Data/:id`, (req,res) =>{
    // console.log("patch hits", req.params.id)
    const pokemonId = Number(req.params.id);
    const updatedData = req.body;

    // Read existing data
    let pokemonData = JSON.parse(fs.readFileSync("Pokemon_Data.json"));

    // Find the Pokémon to update
    const index = pokemonData.findIndex(p => p.id === pokemonId);

    if (index === -1) {
        return res.status(404).json({ error: "Pokemon not found" });
    }

    // Merge updates (only fields sent in the request)
    pokemonData[index] = { ...pokemonData[index], ...updatedData };

    // Write back to file
    fs.writeFileSync("Pokemon_Data.json", JSON.stringify(pokemonData));

    res.json(pokemonData[index]);
})

app.patch("/Users/:id", (req,res) => {
    console.log("Patch called")
    const user_id = Number(req.params.id);
    console.log("user id:", user_id)
    const updated_data = req.body;

    let users_data = JSON.parse(fs.readFileSync("Users.json"));
    console.log("Users data loaded")
    console.log(updated_data)
    const index = users_data.findIndex(u => u.id === user_id);

    if(index === -1){
        return res.status(404).json({error: "User not found"})
    }

    users_data[index] = {...users_data[index],...updated_data}

    fs.writeFileSync("Users.json", JSON.stringify(users_data))
})

app.use(express.static("./public"));

app.listen(3000, () => {
  console.log(`Server is listening on port ${3000}}`);
});