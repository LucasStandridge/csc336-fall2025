const shoot_button = document.getElementById('shoot-button');
const pass_button = document.getElementById('pass-button')
const reset_button = document.getElementById('reset-button')
const bottle_wall = document.getElementById("wall")
const add_button=document.getElementById('add-button')
let bottle_count = 99
let bottle_start = 99
let shelf_start = 9
let shelf_count = 9
let pass_count = 0
let shoot_count = 0
let count_card=document.getElementById("count-card");

function pop_bottle(event) {
    const bottles = bottle_wall.querySelectorAll('.bottle');
    const shelves = bottle_wall.querySelectorAll('.shelf');
    if (bottles[bottles.length-1].style.visibility != "hidden") {
        bottles[bottle_start-bottle_count].style.visibility="hidden"
        bottle_count--
        if(bottle_count%11==0){
            shelves[shelf_start-shelf_count].style.visibility ="hidden"
            shelf_count--
        }
    count_card.innerText = "Bottles on the wall: " + bottle_count;
        if(event.target == shoot_button){
            shoot_count++
        }
        if(event.target == pass_button){
            pass_count++
        }
    } else {
        if(pass_count >= bottle_start){
            alert("You passed them all around! Way to share! You're a role model!")
        }
        else if(shoot_count >= bottle_start){
            alert("You shot them all...thats...uh... maybe pass some next time. Thats a lot of violence")
        }
        else{
            alert("No more bottles on the wall! You shot and passed some. Variety is the spice of life after all");
        }
    }
    if (bottle_count ==0){
    shoot_button.style.display = "none"
    pass_button.style.display = "none"
}
}

function reset(){
    for(let i=0; i<bottles.length;i++){
        bottles[i].style.visibility="visible"
    }
    for(let j=0;j<shelves.length;j++){
        shelves[j].style.visibility="visible"
    }
    bottle_count=bottle_start
    shelf_count=shelf_start
    pass_count=0
    shoot_count=0
    count_card.innerText = "Bottles on the wall: " + bottle_count;
    reset_button.style.backgroundColor="#" + Math.floor(Math.random()*16777215).toString(16);
    add_button.style.backgroundColor="#" + Math.floor(Math.random()*16777215).toString(16);
    shoot_button.style.backgroundColor="#" + Math.floor(Math.random()*16777215).toString(16);
    pass_button.style.backgroundColor="#" + Math.floor(Math.random()*16777215).toString(16);
    if (bottle_count !=0){
    shoot_button.style.visibility = "visible"
    pass_button.style.visibility = "visible"
}
}

function add_row(){
    const new_line = document.createElement("div")    
    new_line.className = "bottle-line";
    for(let i=0;i<11;i++){
        const new_bottle = document.createElement("img");  
        new_bottle.src = "bottle.png";                     
        new_bottle.height = 100;                           
        new_bottle.className = "bottle";
        bottle_wall.appendChild(new_bottle)
    }              
    bottle_wall.appendChild(new_line);   
    bottle_count +=11
    shelf_count+=1
    bottle_start+=11
    shelf_start+=1
    count_card.innerText = "Bottles on the wall: " + bottle_count;
    if (bottle_count !=0){
    shoot_button.style.visibility = "visible"
    pass_button.style.visibility = "visible"

}
}

shoot_button.addEventListener('click', pop_bottle);
pass_button.addEventListener('click', pop_bottle)
reset_button.addEventListener('click', reset)
add_button.addEventListener('click', add_row)