async function test(){
    let response = await fetch("https://csc336-fall2025-bmdg.onrender.com/")
}

const sheet_id = "11XhA5zlgcSNtbhrCKjInq330YgjbAxXrl41rbtzc8Yw";
const sheet_url = `https://docs.google.com/spreadsheets/d/${sheet_id}/edit?gid=0#gid=0`

async function fetchAndParseSheet(){
    try{
        const res = await fetch(sheet_url);
        const text = await res.text();

        //Breaks the rows of data into new lines that are 1 value separated by commas
       const lines = text.trim.split("\n");
       const headers = lines[0].split(",");

       //slice: get everything except for the first lines
       //map: for every entry in the array,
       const data = lines.slice(1).map(line => {

       })
    } catch{

    }
}

fetchAndParseSheet();