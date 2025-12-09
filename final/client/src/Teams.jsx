import NavBoard from './NavBoard';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Teams({ current_user, pokemon_list, setCurrentUser }) {
    const navigate = useNavigate();

    //If the user has an empty teams (like if they delete them) i want to get rid of them
    useEffect(() => {
        if (current_user) {
            const non_empty_teams = current_user.teams.filter(team => team.length > 0);
            if (non_empty_teams.length !== current_user.teams.length) {
                setCurrentUser(prev => ({ ...prev, teams: non_empty_teams }));
            }
        }
    }, [current_user, setCurrentUser]);

    //a variable to contain all the teams that the user has
    const curr_teams = current_user.teams;

    return (
        <div className="teams-container">
            <NavBoard />
            <h2>Your Teams</h2>

            {/*Text for if they have no teams*/}
            {curr_teams.length === 0 ? (
                <p className="empty-team-msg">You have no teams!</p>
            ) : (
                //otherwise, for each team
                curr_teams.map((team, team_index) => {
                    //I want to get the pokemon that are in the team
                    const team_pokemon = pokemon_list.filter(p => team.includes(p.id));

                    return (
                        <div className="team-box" key={team_index}>
                            <h3>
                                Team {team_index + 1}
                                {/*Button to edit a team, which works by bringing you to the teambuilder jsx 
                                with the index of the team saved*/}
                                <button onClick={() => navigate("/teambuilder", { state: { team_index } })}>
                                    Edit This Team
                                </button>

                                {/*And one to delete them. This work by setting the user state to the 
                                same, except without the index of the team index they clicked on*/}
                                <button onClick={() => {
                                    setCurrentUser(prev => ({
                                        ...prev,
                                        teams: prev.teams.filter((_, index) => index !== team_index)
                                    }));
                                }}>Delete This Team</button>
                            </h3>

                            {/*This display all the pokemon in the team for each team*/}
                            <div className="team-pokemon-grid">
                                {team_pokemon.map(p => (
                                    <div className="pokemon-card" key={p.id}>
                                        <img src={p.sprite} alt={p.name} width={120} height={120} />
                                        <p>{p.name.toUpperCase()}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })
            )}

            {/*adds a new team with a random pokemon in it, because empty arrays get deleted automatically*/}
            <button
                id="new_team_button"
                onClick={() => {
                    const randomPokemonId = pokemon_list[Math.floor(Math.random() * pokemon_list.length)].id;

                    setCurrentUser(prev => ({
                        ...prev,
                        teams: [...prev.teams, [randomPokemonId]]
                    }));

                }}
            >
                New Team
            </button>
        </div>
    );
}
