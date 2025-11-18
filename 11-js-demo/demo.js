let x = -10;
//Ternary Operator:
// let y = (x>0) ? y = x : y=0 ;


// let fruits = () => ["apple", "banana", "coconut"];

function fruits(){
    return ["apple", "banana", "coconut"];
}
//Array Deconstructuring
let [fruit1,fruit2,fruit3] = fruits()
console.log(fruit1);

//Object destructing
let person = {
    name:"Mike",
    job:"professor"
}

let {name,job} = person;
console.log(job)

//Using map to iterate through an array
let numbers = [1234,52431,3465,9,-3245];

numbers.forEach((element,index) => console.log(element));

let newArray = numbers.map((element) => element+10);
console.log(newArray);

