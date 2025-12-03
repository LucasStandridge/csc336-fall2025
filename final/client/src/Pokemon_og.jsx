import { useState, useEffect } from 'react';
import "./Pokemon.css"

//react components must be all upercase
function FetchPokemon(){

    //this use state stores the current pokemon being fetched
    const [pokemon, setPokemon] = useState([])
    fetchMultiplePokemon();
    
    const fetchMultiplePokemon = async () => {
    for (let id = 1; id <= 1025; id++) {
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const pokemon_data = await res.json();

            // send to backend
            await fetch("http://localhost:5000/Pokemon_Data.json", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(pokemon_data)
            });

        } catch (err) {
            console.log(err);
        }
    }
    const finalGet = await fetch("http://localhost:5000/Pokemon_Data.json");
    const allPokemon = await finalGet.json();
    console.log("TOTAL STORED:", allPokemon.length);
};

    // useEffect(()=>{
    //     const fetchMultiplePokemon = async () => {
    //         const resultsMap = {}

    //         for(let id = 1; id<1026; id++){
    //             try{
    //                 const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    //                 if(!res.ok) throw new Error ("error fetching inside for loop");
                   
    //                 const data = await res.json();
                    
    //                 const final_evos = await getFinalEvo(data.species.url);

    //                  if(final_evos != null){
    //                     for (let evo of final_evos) {
    //                     resultsMap[evo.id] = evo;
    //                 }
    //                 }
                    

    //                 setPokemon(Object.values(resultsMap));

    //             }catch(err){
    //                 console.log(err);
    //             }
    //         };
    //     };  
    //     fetchMultiplePokemon()
    // }, []);
    
    // const seen_chains = new Set();
    //  const getFinalEvo = async (speciesURL) => {
    //     try{
    //         const results = []
    //         //Make and maintain a SET of all evo chains that have been seen already. 
    //         //Sets CANNOT have the same thing in them twice, so the idea is to not add the same evo chain multiple times

    //         //First I need to fetch the evolution chain. This requires a different API call, using a passed in ID
    //         //It also needs to be a url that is not in the set list, becasue that would waste time fetching a link I already have
    //         //So, if the URL is not already in the seen chains, we fetch that data and add it to the set

    //         if(!seen_chains.has(speciesURL)){
    //             //Fetch the data
    //             const species_res = await fetch(speciesURL)
    //             const species_data = await species_res.json();
    //             //And also add it to the set, so that we know not to get that URL again
    //             seen_chains.add(speciesURL);    


    //         const chain_res = await fetch(species_data.evolution_chain.url);            
    //         if (!chain_res.ok) throw new Error("Evolution chain not found");
    //         const evo_chain_data = await chain_res.json();
            
    //         let final_evos = await traverseChain(evo_chain_data.chain);

    //         for(let evo of final_evos){
    //             const final_res = await fetch(`https://pokeapi.co/api/v2/pokemon/${evo.name}`);
    //             const final_evo_data = await final_res.json();
    //             results.push({
    //                 name: final_evo_data.name,
    //                 id: final_evo_data.id,
    //                 sprite: final_evo_data.sprites.front_default,
    //                 final_evo: true
    //             });
        
    //         }

    //         return results
    //         }else{
    //             console.log("link already in set, skipping fetch")
    //             return
    //         }
            
    //     }catch(err){
    //         console.log(err)
    //     }
    //  } 


    //  const traverseChain = (chainNode) => {
    //     const finalEvos = [];
    //     // If no evolves_to, this is a final evolution
    //     if (chainNode.evolves_to.length === 0) {
    //         finalEvos.push(chainNode.species);
    //     } else {
    //         // Otherwise, for each branch, recurse
    //         chainNode.evolves_to.forEach(child => {
    //         finalEvos.push(...traverseChain(child));
    //         });
    //     }

    //     return finalEvos;
    // };


  return (
    <div>
        Hello
    </div>
  );
}

export default FetchPokemon;
