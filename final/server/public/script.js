function traverseChain(chain_node, seen_evos) {
    //finalEvos will be an array of all the possible final evolutions of a pokemon
    //this helps ensure that all pokemon are added, because some pokemon have multiple final evolutions
    const finalEvos = [];

    //If the pokemon doesnt evolve to anything,its a final evolution
    if (chain_node.evolves_to.length === 0) {
        finalEvos.push(chain_node.species.name);
         // and i just need to push the name
         //i cannot add it to the seen pokemon, or else it gets skipped in the push
         //its needs to be added after it has been pushed
    } else {
        //otherwise, it is not a final evolution
        chain_node.evolves_to.forEach(child => {
            //so i can recusively call the function onto itself, so explore until the final evolution
            finalEvos.push(...traverseChain(child,seen_evos));      
            //and each pokemon that has been recursed onto is now seen  
            seen_evos.add(chain_node.species.name);;
        });
    }

    //now return the names of the final evolutions
    return finalEvos;
}

async function checkVarieties(species_data){
    //links to return onto the JSON
    let return_links = [];
    //the base name of the pokemon (just deoxys, not deoxys-normal)
    let base_name = "";
    //similar to the pokemon and pokemon spcies thing, the variation sprites are in a new link
    let variety_links = []

    //so, for each variation
    for(let variation of species_data.varieties){
        if(!variation.is_default){
            //if its not the default sprie, i want to collect it's link
            variety_links.push(variation.pokemon.url)
        }else{
            //otherwise i just want to grab the base name (all pokemon variations are split up by a hyphen)
            base_name = variation.pokemon.name.split("-")[0].toLowerCase();
        }
    }
    //then, for each link i need to fetch it and get the sprite
    for(link of variety_links){
        let variety_call = await fetch(link);
        let variety_data = await variety_call.json();
        return_links.push(variety_data.sprites.front_default)
    }
    //then return the name and the links in a nice object to read later
    return {base_name, variation_links: return_links};
}

//Create a button to read from the JSON whenever it is clicked (for testing)
let data_button = document.querySelector("#data_button");

data_button.addEventListener("click", async e=>{
    console.log("Button clicked, going to get request");
    let response = await fetch("/Pokemon_Data"); 
    if(!response.ok) throw new Error ("response not ok line 7 script.js")
    res_data = await response.json();
    //Returns a random pokemon from the JSON
    console.log(res_data[Math.floor(Math.random() * res_data.length) + 1])    
})

//Create a button to download all the pokemon data and put it into a JSON.
//This could just run automatically but a button seems much better logistically
let post_button = document.querySelector("#post_button");

post_button.addEventListener("click", async e => {
    //Create a generation variable to put onto each pokemon. 
    //I think its easier to declare it outside the for loop, but it really doesn't matter
    generation = 1;

    //I want to make a set with the names of pokemoon that have already been seen 
    //So that i can skip some fetches in the future
    let seen_evos = new Set();

    /*There is 1025 pokemon, and IDs start at 1.
    //I like this method, even though if more Pokemon come out i would have to manually update it
    It makes it easy to test specific pokemon (like deoxys and wormadam who were giving me trouble (youll see later))*/
    for(let id = 1; id<1026; id++)

        /*Fetch the POKEMON api data. this part is a little clunky
        For some reason, the api doesnt just put the evolutions inside of the pokemon data
        even though I personally think what the pokemon evolves into is pretty relevant data, but whatever
        what do i know
        */
        {let pokemon_fetch = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        let pokemon_data = await pokemon_fetch.json();

        //If this pokemon has been seen, i can skip the iteration
        //This is because a seen pokemon would be either a not fully evolved pokemon, or a final evolution 
        //which has already been added
        if(seen_evos.has(pokemon_data.name)){
            console.log(`${pokemon_data.name} has been seen. Skipping to next iteration`)
            continue;
        }

        /* Anyways, since what the pokemon evolves into isnt in the pokemon_data fetch, I need to fetch the SPECIES url
        this is lame and i dont like it. But since I only want fully evolved pokemon, this saves time in the long run
        (i think), since I will use this data to skip to the end of the evolution chain.
        Example: Instead of fetching bulbasaur, ivysaur, the venasaur, i fetch bulb, then fetch its chain, 
        then see venasaur in the chain, so i can then skip fetching ivysaur and venasaur*/
        let species_fetch = await fetch(pokemon_data.species.url);
        let species_data = await species_fetch.json();

        //This is the JSON data that I want. Pokemon have lots of data but only this is important to me 
        //I have also said that like 10 times, then went to repush all of them to add more data so maybe they are cooking
        let push_data = {
            name: pokemon_data.name,
            id: pokemon_data.id,
            sprite:pokemon_data.sprites.front_default,
            //The evolution chains are a DIFFERENT API (WHYYYYYY), so i need to fetch that later using this url
            chain_url: species_data.evolution_chain.url, 
            //For filtering purposes  
            generation: generation,
            types: pokemon_data.types.map(t => t.type.name), 
            //I want to be able to give people the ability to have favorite pokemon
            //Maybe the favorites will be the shiny forms. Thatd be cool
            favorite: false,
            //Some pokemon have different forms. I want to display those eventualyl
            variation_sprites: []    
        }

        push_data.types = pokemon_data.types.map(t => t.type.name);

        //This is because of those dastardly deoxys, wormadam, and oricorio fellows (and rotom also)
        //Ok, so the problem was that the pokemon are stored as (example) deoxys-normal
        //Or oricorio-baille, which makes it so that the names dont match up later.
        //There is a function later that will return the base name (i.e. just deoxys)
        //And also sprites for all the different variations. I want to display those later
        if (species_data.varieties && species_data.varieties.length > 1) {
            const { base_name, variation_links } = await checkVarieties(species_data);
            //Base name is a normalized name (doexys, rotom)
            push_data.name = base_name;
            push_data.variation_sprites = variation_links;
        }

        //These pokemon signify that a generation has ended, so i need to move to the next one
        const last_in_gen = new Set ([
            "mew", "celebi", "deoxys", "arceus", "genesect", 
            "volcanion", "necrozma", "calyrex", "pecharunt"
        ])

        //If the pokemon is in that set, the generation increments
        if(last_in_gen.has(push_data.name)){
            generation += 1
        }

        //finally i can fetch the evolution chain url (i hate whoever did this)
        let fetch_chain = await fetch(push_data.chain_url);
        let chain_data = await fetch_chain.json();
        
        //This variable is necessary in case a pokemon has multiple final evolutions
        //Such as applin, tyrogue, eevee
        let final_forms = traverseChain(chain_data.chain, seen_evos);
        console.log("105",final_forms)
        //ok so, if pokemons name is a final form, i want to push that pokemon to the data
        if(final_forms.includes(push_data.name)){ 
            let pushChange = await fetch("/Pokemon_Data", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(push_data),
        });

        //Also, this pokemono has now been seen
        seen_evos.add(push_data.name);

        //Then i want to print this so that I know it worked
        let responseJSON = await pushChange.json();
        console.log("Updated world:", responseJSON);
        }else{
            //If its not a final evolution, i want to know
            console.log(`${push_data.name} is not a a final evolution, adding ` , final_forms)
        }}
});