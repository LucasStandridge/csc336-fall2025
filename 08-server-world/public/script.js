let dataFormEl = document.querySelector("#dataForm");
dataFormEl.addEventListener("submit", async e=>{
     e.preventDefault();
    
    let friendDisplay = [];
    let formData = new FormData(dataFormEl);

    let data = Object.fromEntries(formData.entries());

    let name = data.nameInput;
    let friendName = data.newFriend;

    let response = await fetch("/world");
    let worldJSON = await response.json();

    for(let region of worldJSON.region){
        for(let town of region.towns){
            for(let person of town.notable_people){
                if (person.name == name){
                    person.friends.push(friendName);
                    friendDisplay = [];
                    for(let friend of person.friends){
                        friendDisplay.push(friend);
                    }
                }
            }
        }
    }

    let pushChange = await fetch("/world", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    let responseJSON = await pushChange.json();
    console.log("Updated world:", responseJSON);    

    let friendsP = document.querySelector("#friends_list");
    let listHTML = "<ol>";

    for (let friend of friendDisplay) {
        listHTML += `<li>${friend}</li>`;
    }

    listHTML += "</ol>";
    friendsP.innerHTML = `Friends of ${name}:` + listHTML;
});

let notable_people = document.querySelector("#notable_people_div");

async function displayPeople(){
    let response = await fetch("/world"); 
    console.log("update worked");
    let peopleData = await response.json();
    let people = [];

    for(let region of peopleData.region){
        for (let town of region.towns){
            for (let person of town.notable_people){
                people.push(person)
            }
        }
    }

    let notable_people = document.querySelector("#notable_people");
    notable_people.innerHTML = "Notable People: ";
    let dropdown_menu = document.querySelector("#nameInput");
    let listHTML = "<ol>";

    for (let person of people) {
        listHTML += `<li>${person.name}</li>`;
        dropdown_menu.innerHTML += `<option>${person.name}</option>`;
    }

    listHTML += "</ol>";
    notable_people.innerHTML = "Notable People:" + listHTML;
}

displayPeople();