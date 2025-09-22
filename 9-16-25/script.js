let person = {
    name: "Mike",
    favoritePetIsLizard:true,
    hello: function(n){
        for(let i = 0; i<n;i++)
            console.log("yay");
    },
    favoritePet:{
        name: "sosa",
        species: "lizard"
    }
}

function rollDice(){
    let randomNumber = Math.ceil(Math.random() * 6);
    let diceRollDiv = document.querySelector("#dice-roll");
    diceRollDiv.innerHTML += "<div class='dice-roll'>" + randomNumber + "</div>";
}