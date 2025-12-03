import { GoogleGenAI } from "@google/genai";
//npm install dotenv
//add .env to the gitignore file
import dotenv from 'dotenv';

//Load what is in the .env file
dotenv.config();

const ai = new GoogleGenAI({
    apiKey: "AIzaSyAPDNSAW8bjujR8mlO0H1S0I6o1iHsk2xU"
});

async function generateText(prompt){
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    })
    
    return response.text;
}

let prompt = "Give me the 5 most popular Risk of Rain songs please"

let llmText = await generateText(prompt);

console.log(llmText);