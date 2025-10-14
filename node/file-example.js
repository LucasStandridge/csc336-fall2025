const fs = require("fs") //CommonJS module loading

let programCount = 0;

try{
    let fileContents = fs.readFileSync("program_count.txt", "utf8");
    console.log(fileContents)
} catch(error){
    console.log("whoops", error)
}
programCount++;
fs.writeFileSync("program_count.txt", JSON.stringify(programCount));
