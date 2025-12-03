import NavBoard from "./NavBoard";
export default function FavoritePokemon({pokemon_list, updateFavoriteStatus, current_user, setCurrentUser}){

    //Creating a list to store the ids of the users favorite pokemon in 
    let favorites = []
    
    //Huge if statement because it made building the website easier but realistically it only needs the 
    //current_user.favorite_pokemon
    if (current_user && current_user.favorite_pokemon && current_user.favorite_pokemon.length > 0) {
        //favorites is going to filter the pokemon in the list of all pokemon, so that the list is only the ids of the 
        //pokemon that the user has favorites
        favorites = pokemon_list.filter(p => current_user.favorite_pokemon.includes(p.id));
    }

    //I probably only need this code snippet - check later
    let favorite_ids = []
    for(let pokemon of favorites){
        favorite_ids.push(pokemon.id)
    }

    return(
        <div>
        <NavBoard/>
        <h2>Your favorite pokemon</h2>
        {console.log(current_user)}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
               {favorites.length !==0 ? ( 
                    favorites.map(p => (
                    
                    <div key={p.id} style={{ textAlign: "center" }}>
                    <img src={p.sprite} alt={p.name} width={120} height={120} />

                    <button id={p.id} onClick={() => updateFavoriteStatus(p,current_user,setCurrentUser)}>
                        {favorite_ids.includes(p.id) ? (
                            <img src="https://i.imgur.com/I0EwG.png" width = "20"/>
                        ) : (
                            <img src="/star-16.png" width = "20"/>
                        )}
                    </button>
                    
                    <p>{p.name.toUpperCase()}</p>   
            </div>
            ))
               ) : (
                <p> 
                    You have no favorite pokemon!
                </p>
               )} 
                
        </div>
        </div>
    )
}