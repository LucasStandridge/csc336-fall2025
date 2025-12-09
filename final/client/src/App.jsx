import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage.jsx";
import NavBoard from "./NavBoard.jsx";
import CreateUser from "./CreateUser.jsx"
import FetchPokemon from "./FinalEvolutions.jsx"
import FavoritePokemon from './FavoritePokemon.jsx';
import Teams from "./Teams.jsx";
import TeamEditor from "./TeamEditor.jsx";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Trillions and billions of imports

export default function App() {
    //A bunch of variables i need in other pages - theyll be explained there
    const [logged_in, setLoggedIn] = useState(false);
    const [pokemon_list, setPokemonList] = useState([]);
    const [current_user, setCurrentUser] = useState(null)
    const [filters, setFilters] = useState({
        generation: "ShowAll",
        type: "ShowAll",
        name: ""
    });

    //A function that will be passed into the login page to log in (shocker)
    async function logIn(username, password) {
        //Get all the users
        const res = await fetch("/api/Users");
        const data = await res.json();

        //matched user is null by default
        let matched_user = null;

        //If a username matches, matched_user gets the username
        for (let user of data) {
            if (user.username === username) {
                matched_user = user;
                break;
            }
        }

        //If there is no matched user, the username is wrong
        if (!matched_user) {
            toast(`${username} is an incorrect username. Please try again`);
            return false;
        }

        //Otherwise the password is wrong
        if (matched_user.password !== password) {
            toast("Password incorrect");
            return false;
        }
        //Otherwise it works
        toast(`Login success, thank you ${username}`);
        setCurrentUser(matched_user);
        setLoggedIn(true);

        return true;
    }


    //When the website starts, I want to get all the pokemon data. It needs to be in this jsx because it gets passed 
    //to so many different pages
    useEffect(() => {
        async function loadData() {
            //get the data
            const res = await fetch("/api/Pokemon_Data");
            let data = await res.json();
            //put all the data into the pokemon list, which will be used for displaying it later
            setPokemonList(data);
            //console.log("Pokemon loaded")
        }
        loadData();
    }, [setPokemonList]);

    //the favorite status is in multiple apps, so it needs to be defined here
    async function updateFavoriteStatus(pokemon, user, setCurrentUser) {
        //first i want to get all the users current favorites
        const updatedFavorites = [...user.favorite_pokemon];

        //Then, if the pokemon is already in the favorites it should be removed
        if (updatedFavorites.includes(pokemon.id)) {
            updatedFavorites.splice(updatedFavorites.indexOf(pokemon.id), 1);
            toast(`${pokemon.name.toUpperCase()} removed from Favorites`)
            //Otherwise, it should be added
        } else {
            updatedFavorites.push(pokemon.id);
            toast(`${pokemon.name.toUpperCase()} added to Favorites`)

        }

        //Then i need to update the React state to make the changes visible
        setCurrentUser(prevUser => ({ ...prevUser, favorite_pokemon: updatedFavorites }));

        //Now i need to re-render the pokemon list to update what the buttons look like (youll see later)
        setPokemonList(prevList =>
            prevList.map(p =>
                p.id === pokemon.id ? { ...p, favorite: !p.favorite } : p
            )
        );

        //Now I need to patch the user, so that the favorite_pokemon category of the user object is updated
        await fetch(`/api/Users/${user.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ favorite_pokemon: updatedFavorites })
        });
    }

    //The team status is also in multiple apps, so it also gets defined ehre
    async function updateTeamStatus(pokemon, user, setCurrentUser, team_index) {

        //Get the team from the user using the passed in index
        const curr_team = [...user.teams[team_index]];

        //if the pokemon is in the team, it needs to be removed
        if (curr_team.includes(pokemon.id)) {
            curr_team.splice(curr_team.indexOf(pokemon.id), 1);
            toast(`${pokemon.name.toUpperCase()} removed from Team ${team_index + 1}`)
        } else {
            //if it isnt, it gets added
            curr_team.push(pokemon.id);
            toast(`${pokemon.name.toUpperCase()} added to Team ${team_index + 1}`)
        }

        //Need to make a new variable to pass to the react state later
        const updated_teams = [...user.teams];
        //So i get all the teams from the user, then change the one that is being modified
        updated_teams[team_index] = curr_team;

        //Update state
        setCurrentUser(prevUser => ({
            ...prevUser,
            teams: updated_teams
        }));

        // Re-render Pokemon list if needed
        // setPokemonList(prevList =>
        //     prevList.map(p =>
        //         p.id === pokemon.id ? { ...p, favorite: !p.favorite } : p
        //     )
        // );

        //Update the User json to reflect the changes made
        await fetch(`/api/Users/${user.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ teams: updated_teams })
        });
    }


    return (

        <BrowserRouter>
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
            />
            <Routes>
                {/*The basic path should be the log in page, so it is the first thing seen */}
                <Route path="/" element={<LoginPage logIn={logIn} logged_in={logged_in} />} />

                <Route path="/createuser" element={<CreateUser />} />
                <Route path="/home" element={
                    <NavBoard
                        setLoggedIn={setLoggedIn}
                        current_user={current_user} />
                } />
                <Route path="/favorite_pokemon" element={
                    <FavoritePokemon
                        pokemon_list={pokemon_list}
                        updateFavoriteStatus={updateFavoriteStatus}
                        current_user={current_user}
                        setCurrentUser={setCurrentUser} />
                } />

                <Route path="/final_evos" element={
                    <FetchPokemon
                        pokemon_list={pokemon_list}
                        setPokemonList={setPokemonList}
                        filters={filters}
                        setFilters={setFilters}
                        updateFavoriteStatus={updateFavoriteStatus}
                        current_user={current_user}
                        setCurrentUser={setCurrentUser}
                        display_nav={true}
                        updateTeamStatus={updateTeamStatus} />
                } />

                <Route path="/teams" element={
                    <Teams
                        current_user={current_user}
                        pokemon_list={pokemon_list}
                        setCurrentUser={setCurrentUser} />
                } />

                <Route path="/teambuilder" element={
                    <TeamEditor
                        pokemon_list={pokemon_list}
                        setPokemonList={setPokemonList}
                        filters={filters}
                        setFilters={setFilters}
                        updateFavoriteStatus={updateFavoriteStatus}
                        current_user={current_user}
                        setCurrentUser={setCurrentUser}
                        updateTeamStatus={updateTeamStatus} />
                } />
            </Routes>
        </BrowserRouter>

    );
}
