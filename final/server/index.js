import express from "express";
import fs from "fs";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/Pokemon_Data", (req, res) => {
    try {
        let file_contents = fs.readFileSync("./Pokemon_Data.json", "utf-8");
        let file_data = JSON.parse(file_contents);
        res.json(file_data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});

app.get("/api/Users", (req, res) => {
    try {
        let file_contents = fs.readFileSync("./Users.json", "utf-8");
        let file_data = JSON.parse(file_contents);
        res.json(file_data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});

app.post('/Pokemon_Data', (req, res) => {
    try {
        let file_data = JSON.parse(fs.readFileSync("./Pokemon_Data.json", "utf-8"));
        file_data.push(req.body);
        fs.writeFileSync("./Pokemon_Data.json", JSON.stringify(file_data, null, 2));
        res.send(file_data);
    } catch {
        res.status(500).send("Error writing file");
    }
});

app.post("/Users", (req, res) => {
    try {
        let file_data = JSON.parse(fs.readFileSync("./Users.json", "utf-8"));
        file_data.push(req.body);
        fs.writeFileSync("./Users.json", JSON.stringify(file_data, null, 2));
        res.status(201).json(req.body);
    } catch {
        res.status(500).send("Error writing file");
    }
});

app.patch("/Pokemon_Data/:id", (req, res) => {
    const pokemonId = Number(req.params.id);
    const updatedData = req.body;
    let pokemonData = JSON.parse(fs.readFileSync("Pokemon_Data.json"));
    const index = pokemonData.findIndex(p => p.id === pokemonId);
    if (index === -1) return res.status(404).json({ error: "Pokemon not found" });
    pokemonData[index] = { ...pokemonData[index], ...updatedData };
    fs.writeFileSync("Pokemon_Data.json", JSON.stringify(pokemonData));
    res.json(pokemonData[index]);
});

app.patch("/Users/:id", (req, res) => {
    const user_id = Number(req.params.id);
    const updated_data = req.body;
    let users_data = JSON.parse(fs.readFileSync("Users.json"));
    const index = users_data.findIndex(u => u.id === user_id);
    if (index === -1) return res.status(404).json({ error: "User not found" });
    users_data[index] = { ...users_data[index], ...updated_data };
    fs.writeFileSync("Users.json", JSON.stringify(users_data));
    res.json(users_data[index]);
});


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public", "dist")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "dist", "index.html"));
});


app.listen(3000, () => {
  console.log(`Server is listening on port 3000`);
});
