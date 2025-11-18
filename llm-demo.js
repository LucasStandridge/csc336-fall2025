import { GoogleGenAI } from "@google/genai";

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