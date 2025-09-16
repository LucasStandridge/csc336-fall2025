console.log("print from js file");
let demoBoxes=document.getElementsByClassName("demo-box");
console.log(demoBoxes.length);

let clickCount=0;

function clickedOnDemoBox(){
    clickCount++;
    let darkSoulsDiv=document.getElementById("dark-souls");
    darkSoulsDiv.innerText = clickCount;
}