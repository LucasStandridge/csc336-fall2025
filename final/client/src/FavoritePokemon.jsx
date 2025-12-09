import NavBoard from "./NavBoard";
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function FavoritePokemon({ pokemon_list, updateFavoriteStatus, current_user, setCurrentUser, logged_in }) {
    const navigate = useNavigate();
    useEffect(() => {
        if (!logged_in) {
            navigate("/")
            toast("You have been logged out due to refresh. Please log back in.")
        }
    }, [logged_in]);

    //Creating a list to store the ids of the users favorite pokemon in 
    let favorites = []

    //Huge if statement because it made building the website easier but realistically it only needs the 
    //current_user.favorite_pokemon
    if (current_user && current_user.favorite_pokemon && current_user.favorite_pokemon.length > 0) {
        //favorites is going to filter the pokemon in the list of all pokemon, so that the list is only the
        //pokemon whos ids are in the current users favorite_pokemon
        favorites = pokemon_list.filter(p => current_user.favorite_pokemon.includes(p.id));
    }


    //also i need their ids for later bc its easier
    let favorite_ids = []
    for (let pokemon of favorites) {
        favorite_ids.push(pokemon.id)
    }

    return (
        <div>
            <NavBoard />
            <h2 id="favorite-tag">Your favorite pokemon</h2>
            <div className="favorite-gradient" style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {/*This map code comes up a lot.*/}
                {favorites.length !== 0 ? (
                    //if the user has favorites i wan tto map them

                    favorites.map(p => (
                        //each pokemon gets its own div with an image of their sprite
                        <div key={p.id} style={{ textAlign: "center" }}>
                            <img src={p.sprite} alt={p.name} width={120} height={120} />

                            {/*Usually the pokemon get buttons when displayed. Clicking this will
                    remove the pokemon from favorites*/}
                            <button className="favorite_pokemon_button" id={p.id} onClick={() => updateFavoriteStatus(p, current_user, setCurrentUser)}>
                                <img src="star.png" width="20" />
                            </button>

                            {/*I like the names to be in uppercase*/}
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