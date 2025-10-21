//Array Functions
let arr = [true, false, "dog", "cat"];
console.log(arr);

//Adds something to the end of an array
arr.push("lizard");
console.log(arr);

//Removes the last element of the array. Also returns the removed element
arr.pop();
console.log(arr);

//Removes a specific element from the array. 
// Takes the parameter of which index to remove, and then how many indexes after that to remove as well
//Returns each removed element
let spliced = arr.spliced(1,1);
console.log(arr, spliced);

//Different types of For loops
arr.forEach(val=>{
    console.log(val);
});
for(let val of arr){
    console.log(val);
}
for(let i = 0; i<arr.length;i++){
    console.log(arr[i]);
}

//You can provide.filter with a function and it will return the array with the given conditions
let arr2 = [1,2,3,4,4,6,7,2];
// let lessThan3 = arr.filter(el=>{
//     if(el < 3){
//         return true;
//     }else{
//         return false;
//     }
// });
let lessThan3 = arr.filter(el=> el< 3);
console.log(lessThan3);

//Map makes a new array with a function applied to it
let addTen = arr2.map(el => el + 10);

//Sorting a list
let randNumbers = [];
for(let i = 0; i<100; i++){
    randNumbers.push(Math.random);
}
randNumbers.sort((a,b) => a-b);
console.log(randNumbers);