import FilterPanel from "./Filters.jsx";
import NavBoard from "./NavBoard.jsx"

//This is like, the MAIN file. Its super important and was what started this whole project idea
export default function FinalEvos({
    pokemon_list,
    filters, setFilters,
    updateFavoriteStatus,
    current_user, setCurrentUser,
    display_nav, updateTeamStatus, team_index
}) 
//it gets a ton of parameters because so many other pages rely on it
{
    //this is a variable that stores what pokemon should be displayed. It gets the filter decisions
    //from the Filters.jsx
    const filtered_pokemon = pokemon_list.filter(p => {
        // Generation filter
        const generation_matches =
            filters.generation === "ShowAll" ||
            p.generation === Number(filters.generation);

        // Type filter
        const type_matches =
            filters.type === "ShowAll" ||
            p.types.includes(filters.type);

        //Name filter
        const name_matches =
            filters.name === "" ||
            p.name.includes(filters.name)
        return generation_matches && type_matches && name_matches;
    });

    let favorites = []

    //another massive if statement because it made testing easier but this is all the same as from the favoritepokemon page
    //i just need the users favorites to correctly display the right button
    if (current_user && current_user.favorite_pokemon && current_user.favorite_pokemon.length > 0) {
        favorites = pokemon_list.filter(p => current_user.favorite_pokemon.includes(p.id));
    }

    let favorite_ids = []
    for (let pokemon of favorites) {
        favorite_ids.push(pokemon.id)
    }

    return (
        <div>
            {/*Another page (teamediter) will display this at the bottom, so i dont want the navboard
            automatically displayed*/}
            {display_nav && (
                <NavBoard />
            )}

            {/*I also want to show the filters*/}
            <FilterPanel filters={filters} setFilters={setFilters} />

            {/*Main container with scrolling gradient background*/}
            <div className="generation-gradient">

                {/*Use team-editor style grid for all pokemon */}
                <div className="team-pokemon-grid">
                    {filtered_pokemon.map(p => (
                        <div key={p.id} className="pokemon-card">
                            {/*Pokemon sprite */}
                            <img src={p.sprite} alt={p.name} width={120} height={120} />

                            {/*If youre on the final_evolutions page, the pokemon get a star so you can add
                            it to your favorites*/}
                            {display_nav ? (
                                <button className="favorite_pokemon_button" id={p.id} onClick={() =>
                                    updateFavoriteStatus(p, current_user, setCurrentUser)}>
                                    {favorite_ids.includes(p.id) ? (
                                        <img src="star.png" width="20" />
                                    ) : (
                                        <img src="/star-16.png" width="20" />
                                    )}
                                </button>
                            ) : (
                                //otherwise, it gets a plus sign to add it to your team
                                <button className="add_del_button" id={p.id} onClick={() => {
                                    if (current_user.teams[team_index].length < 7) {
                                        updateTeamStatus(p, current_user, setCurrentUser, team_index)
                                    } else {
                                        //this should be toastify later
                                        console.log("team full")
                                    }
                                }}>
                                    <img src="/plus.png" width="20" />
                                </button>
                            )}

                            {/*Pokemon name */}
                            <p>{p.name.toUpperCase()}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
