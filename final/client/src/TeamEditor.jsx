import { useLocation } from "react-router-dom";
import NavBoard from "./NavBoard";
import FetchPokemon from "./FinalEvolutions";

//Because teameditor links to fetchpokemon, it needs all the same parameters as that one
export default function TeamEditor({
    pokemon_list,
    setPokemonList,
    filters,
    setFilters,
    updateFavoriteStatus,
    current_user,
    setCurrentUser,
    updateTeamStatus
}) {
    //the index of the team being edited is given by the link in Team.jsx
    const { state } = useLocation();
    const team_index = state.team_index;

    //And I want to get that teams information from the user (its an array of ids)
    let team = current_user.teams[team_index];
    //then i want the actual objects to be stored in an array
    let team_pokemon = pokemon_list.filter(p => team.includes(p.id));

    return (
        <div className="team-editor-container">
            <NavBoard />
            <h2>Editing Team {team_index + 1}</h2>

            {/*Some text for if the team is empty*/}
            {team_pokemon.length === 0 ? (
                <p className="empty-team-msg">Your team is empty! Add some Pokémon</p>
            ) : (
                //otherwise i want to show the pokemon in the team
                <div className="team-pokemon-grid">

                    {team_pokemon.map(p => (
                        <div className="pokemon-card" key={p.id}>
                            <img src={p.sprite} alt={p.name} width={120} height={120} />
                            {/*These pokemon get a button to remove them from the team, otherwise its the same map that ive been using*/}
                            <button
                                className="add_del_button"
                                id={p.id}
                                onClick={() => updateTeamStatus(p, current_user, setCurrentUser, team_index)}
                            >
                                <img src="/trash.png" width="20" />
                            </button>
                            <p>{p.name.toUpperCase()}</p>
                        </div>
                    ))}
                </div>
            )}

            {/*Underneath the team, i want to show all the pokemon so that you can add them to your team*/}
            <FetchPokemon
                pokemon_list={pokemon_list}
                setPokemonList={setPokemonList}
                filters={filters}
                setFilters={setFilters}
                updateFavoriteStatus={updateFavoriteStatus}
                current_user={current_user}
                setCurrentUser={setCurrentUser}
                display_nav={false}
                updateTeamStatus={updateTeamStatus}
                team_index={team_index}
            />
        </div>
    );
}
