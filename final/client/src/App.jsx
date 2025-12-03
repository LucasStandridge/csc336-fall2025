import { useState, useEffect } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "./LoginPage.jsx";
import NavBoard from "./NavBoard.jsx";
import CreateUser from "./CreateUser.jsx"
import FetchPokemon from "./FinalEvolutions.jsx"
import FavoritePokemon from './FavoritePokemon.jsx';

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

    //Fetch the user data that I have stored
    const res = await fetch("/Users");
    const data = await res.json();
    const found_names = []
    for (let user of data) {
        if (user.username === username) {
            found_names.push(user.username)
            if (user.password === password) {
                setCurrentUser(user)
                setLoggedIn(true);
            } else {
                console.log("password incorrect");
            }
        }
    }
    return false;
  }

  //When the website starts, I want to get all the pokemon data. It needs to be in this jsx because when I
  //was testing it made things easier, and I figure that it is better to just get it once the page starts anyway
    useEffect(() => {
        async function loadData() {
            //get the data
            const res = await fetch("/Pokemon_Data");  
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
    //Otherwise, it should be added
    } else {
        updatedFavorites.push(pokemon.id);
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
    await fetch(`/Users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ favorite_pokemon: updatedFavorites })
    });
}

  return (
    <BrowserRouter>
        <Routes>
            {/*The basic path should be the log in page, so it is the first thing seen */}
            <Route path="/" element={<LoginPage logIn={logIn} logged_in={logged_in}/>} />

            <Route path="/createuser" element={<CreateUser />} />
            <Route path="/home" element={
              <NavBoard
                setLoggedIn={setLoggedIn}
                current_user={current_user}/>
            } />
            <Route path="/favorite_pokemon" element={
                <FavoritePokemon 
                    pokemon_list={pokemon_list}
                    updateFavoriteStatus={updateFavoriteStatus}
                    current_user={current_user}
                    setCurrentUser={setCurrentUser}/>
            }/>

            <Route path="/final_evos" element={
                <FetchPokemon 
                    pokemon_list={pokemon_list}
                    setPokemonList={setPokemonList}
                    filters={filters}
                    setFilters={setFilters}
                    updateFavoriteStatus={updateFavoriteStatus}
                    current_user={current_user}
                    setCurrentUser={setCurrentUser}/>
            }/>
        </Routes>
    </BrowserRouter>
  );
}
