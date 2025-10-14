import * as fs from 'fs';

let fileContents = fs.readFileSync("./world.json", "utf8");

let worldData = JSON.parse(fileContents);

function checkandLoopArray(maybeArray) {
    for (let key of maybeArray) {
      if (Array.isArray(key)) {
        checkandLoopArray(key);
      } else if (typeof key == "object") {
        for (let subKey of Object.keys(key)) {
            let value = key[subKey];
            if(typeof value == "object"){
                checkandLoopArray([value]);
            }else{
                if(subKey == "settlement"){
                    console.log(`Settlement: ${value}`);
                }else if (subKey == "population"){
                    let numVal = Number(value);
                    let changeValues = changePopulation(numVal);
                    key[subKey] = changeValues.finPop;
                    key["cause"] = changeValues.cause;
                    console.log(`Population: ${key["population"]} (${key["cause"]})`);
                }
            }
        }
      }
    }
}

function changePopulation(population){
    let newPop = population;
    let popChange = Math.floor(Math.random() * 4);
    if (popChange == 0){
        newPop += Math.floor(Math.random()*1000);
    }else if (popChange ==1){
        newPop -= Math.floor(Math.random()*1000);
        if (newPop < 0){
            newPop = 0;
        }
    }else if (popChange == 2){
        newPop *= Math.floor(Math.random()*4) + 1;
    }else if (popChange == 3){
        newPop /= Math.floor(Math.random()*4) + 1;
    }
    const posCauses = ["Plentiful harvests", "Blessed by the Gods", "Fruitful trades"];
    const negCauses = ["Rebellion caused turmoil", "Murderers on the loose", "Plague spread"];
    const neutralCauses = ["Nothing ever happens!", "Business as usual"];
    let cause = "";
    if(newPop > population){   
        cause = posCauses[Math.floor(Math.random() * posCauses.length)];
    }else if (newPop < population){
        cause = negCauses[Math.floor(Math.random() * posCauses.length)];
    }else{
        cause = neutralCauses[Math.floor(Math.random() * posCauses.length)];
    }
    let finPop = Math.round(newPop)
    return {finPop, cause};
}

for(let key of Object.keys(worldData)){
    let curr = worldData[key];
    if(typeof curr == "string"){
        console.log(`${key}: ${curr}`)
        let yearVal = Number(curr);
        yearVal += 100;
        worldData["year"] = `${yearVal}`;
    }else if (Array.isArray(curr)){
        checkandLoopArray(curr)
        fs.writeFileSync("./world.json", JSON.stringify(worldData, null, 2), "utf8");
    }
}

