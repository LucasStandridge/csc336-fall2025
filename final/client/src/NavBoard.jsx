import {Link, useLocation} from "react-router-dom";
function NavBoard({setLoggedIn, current_user}) {

  const location = useLocation();

  const check_location = location.pathname === "/home"

  return (
    <div>
        <nav>
          <Link to="/" onClick = {() => setLoggedIn(false)}>Login</Link><br></br>
          <Link to="/home">Guide</Link><br></br>
          <Link to="/final_evos">See All Final Evolutions</Link><br></br>
          <Link to="/favorite_pokemon">See your favorite pokemon!</Link><br></br>
        </nav>

        {check_location && (
          <p>
                      Welcome to my website. The links are rather self explanatory, but here is a brief description:
          <br /><br />
          “See all final evolutions” displays every fully evolved Pokémon, organized by Pokédex order.
          <br />
          A star next to each Pokémon lets you add or remove it from your favorites.
          <br />
          The “favorite pokemon” page shows all your favorites.
          </p>
        )}
         
    </div>
  )
}

export default NavBoard;
