import FilterPanel from "./Filters.jsx";
import "./Pokemon.css"
import MainApp from "./NavBoard.jsx"

export default function FinalEvos({
        pokemon_list, setPokemonList,
        filters, setFilters,
        updateFavoriteStatus = {updateFavoriteStatus},
        current_user, setCurrentUser = {setCurrentUser}
    }) {

    const filtered_pokemon = pokemon_list.filter(p => {
    // Generation filter
    const generationMatches =
        filters.generation === "ShowAll" ||
        p.generation === Number(filters.generation);

    // Type filter
    const typeMatches =
        filters.type === "ShowAll" ||
        p.types.includes(filters.type);

    const nameMatches = 
        filters.name === "" ||
        p.name.includes(filters.name)
    return generationMatches && typeMatches && nameMatches;
    });

    let favorites = []
    
    if (current_user && current_user.favorite_pokemon && current_user.favorite_pokemon.length > 0) {
        favorites = pokemon_list.filter(p => current_user.favorite_pokemon.includes(p.id));
    }

    let favorite_ids = []
    for(let pokemon of favorites){
        favorite_ids.push(pokemon.id)
    }

    return (
        <div>
            <MainApp />
           <FilterPanel filters = {filters} setFilters={setFilters}/>
           {/* {console.log(`Displaying generation: ${filters.generation} and types: ${filters.type} and name: ${filters.name}` )} */}
            <div id="flexbox-div">
                {filtered_pokemon.map(p => (
                    
                    <div key={p.id} style={{ textAlign: "center" }}>
                    <img src={p.sprite} alt={p.name} width={120} height={120} />

                    <button className="favorite_pokemon_button" id={p.id} onClick={() => updateFavoriteStatus(p,current_user,setCurrentUser)}>
                        {favorite_ids.includes(p.id) ? (
                            <img src="https://i.imgur.com/I0EwG.png" width = "20"/>
                        ) : (
                            <img src="/star-16.png" width = "20"/>
                        )}
                    </button>
                    
                    <p>{p.name.toUpperCase()}</p>   
            </div>
            ))}
        </div>
    </div>
    );
}
