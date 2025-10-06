let button = document.querySelector("#callbackDemo")

function clickEventHappened(e){
    console.log("Clicked!")
}

//button.addEventListener("click", (e)=>{
//    console.log("Clicked!")
//});
//button.addEventListener("click", e => {console.log("Clicked!")});

//button.addEventListener("click", e => console.log("Clicked!"));

//let dogRequest = fetch("https://dog.ceo/api/breeds/image/random");

//async function getAndDisplayDogImage(){
  //  let dogResponse = await fetch("https://dog.ceo/api/breeds/image/random");
    //let dogData  = await dogResponse.json()

//    let dogImageHTML = document.createElement("img");
//    dogImageHTML.width = 200;
//    dogImageHTML.src = dogData.message;
//    document.querySelector("#dogDiv").appendChild(dogImageHTML)
//}
//button.addEventListener("click", getAndDisplayDogImage);
//for (i = 0; i<10;i++){
//    getAndDisplayDogImage();
//}

fetch('https://mhw-db.com/monsters')
    .then(response => response.json())
    .then(monsters => {
        for(i=0;i<10;i++){
            let randMonster = Math.floor(Math.random() * monsters.length);
            let randMonsterImageHTML = document.createElement("p");
            randMonsterImageHTML.src = monsters[randMonster].message;
            document.querySelector("#monsterDiv").appendChild(randMonsterHTML)
        }
    })
    .catch(console.log("Whoops"));