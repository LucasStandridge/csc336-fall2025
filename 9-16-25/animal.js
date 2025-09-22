let animals = [
    {
        type:"cat",
        strength:"13",
        rizz:"16",
    },
    {
        type:"dog",
        strength:"14",
        rizz:"9",
    },
    {
        type:"rabbit",
        strength:"7",
        rizz:"12",
    },
    {
        type:"seahorse",
        strength:"2",
        rizz:"20",
    },
    {
        type:"turtle",
        strength:"10",
        rizz:"10",
    }
];

document.addEventListener("DOMContentLoaded", populateAnimalInfoDiv)

function populateAnimalInfoDiv(){
    let animalInfoDiv = document.querySelector("#all-animal-info")
    for(let animal of animals){
        let animalHTML = createAnimalDiv(animal);
        animalInfoDiv.innerHTML += animalHTML
    }
}

function createAnimalDiv(animal){
        <div>
            <h1>${animal.type}</h1>
            <div class='stats'>
                <div>strength: ${animal.strength}</div>
                <div>charisma: ${animal.rizz}</div>
            </div>
        </div>
    ;
}

let addAnimalForm = document.querySelector("#add-animal-form");
addAnimalForm.addEventListener("submit", addNewAnimal);

function addNewAnimal(e){
    e.preventDefault()
    
    let typeInput = document.querySelector("#animal-type-field").value;
    let strInput = document.querySelector("#animal-str-field").value;
    let rizzInput = document.querySelector("#animal-rizz-field").value;  
    
    let newAnimal = {
        type: typeInput,
        strength: strInput,
        rizz: rizzInput,
    }

    animals.push(newAnimal);

    populateAnimalInfoDiv();
}