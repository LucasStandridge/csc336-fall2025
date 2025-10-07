let button = document.querySelector("#callbackDemo")

function clickEventHappened(e){
    console.log("Clicked!")
}

button.addEventListener("click", getAndDisplayMonsterData);
async function getAndDisplayMonsterData(){
    try{
    let monResponse = await fetch('https://mhw-db.com/monsters');
    let monData = await monResponse.json();
    let holder = document.querySelector("#monDiv");
    let innerText = "";

    for(let i=0;i<10;i++){
            let randMonster = monData[Math.floor(Math.random() * monData.length)];
            let randMonsterHTML = document.getElementById("monP");
            innerText = randMonster.name;

            for (let key of Object.keys(randMonster)){
                if(typeof randMonster[key] == "object" && randMonster[key] !== null){
                    continue
                }
                else{
                    innerText+=`<br>${key}: ${randMonster[key]}`
                }
            }
            randMonsterHTML.innerHTML += innerText;
            holder.appendChild(randMonsterHTML);
        }
    }
        catch (error){
            console.log("whoops",error);
        }
}

async function getYGODeck(){
    try{
        let ygoResponse = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php');
        let ygoData = await ygoResponse.json();
        ygoData = ygoData.data
        let tempDeck = [];
        for(let i = 0; i<=40; i++){
            let randCard = ygoData[Math.floor(Math.random() * ygoData.length)];
            tempDeck.push(randCard);
        }
        let newDeck = [];
        const types = ["Monster", "Spell", "Trap"];
        for (let type of types){
            for (let card of tempDeck){
                        if (card.type && card.type.includes(type)) {
                            newDeck.push(card.name);
                        }
                    }
        }
        let ygoDiv = document.getElementById("ygoDiv");
        ygoDiv.innerHTML = newDeck;
    }
    catch(error){
        console.log("whoops",error)
    }
}

getYGODeck();