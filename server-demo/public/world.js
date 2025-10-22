let world;
let people = {};

async function getWorld(){
    let response = await fetch ("/world");
    world = await response.json();
    //document.querySelector("body").innerHTML = `<h1>${world.region[0].name}</h1>`
}

getWorld();

async function setup(){
    console.log("p5 loaded!");
    createCanvas(800,600);

    await getWorld();

    for(let region of world.region){
        for(let town of region.towns){
            for(person of town.notable_people){
                people[person.name] = new Person(person);
            }
            console.log(town.settlement);
        }
    }

    colorMode(HSB);
}

function draw(){
    let hoverPerson;

    background(frameCount%360,100,100);
    for(let name in people){
        if (dist(mouseX, mouseY, this.x, this.y)<person.radius) {
            person.hover = true;
            hoverPerson = person;
        } else{
            person.hover = false;
        }
        let person = people[name]
        person.update()
    }

    if(hoverPerson !== undefined){
        //function
    }
}

function drawPersonInfo(person){
    
}