import {Link, useLocation} from "react-router-dom";

function NavBoard({setLoggedIn}) {

  //i like this page
  const location = useLocation();
  //NavBoard is used in lots of other places, but it also is the home page. So if
  //the user if on the actual home page, there will be extra text displayed
  const check_location = location.pathname === "/home";

  return (
    //Navboard has links to wherever you need to go
    <div className="navboard">
      <nav className="nav-links">
        <Link to="/" onClick={() => setLoggedIn(false)}>Login</Link>
        <Link to="/home">Guide</Link>
        <Link to="/final_evos">Final Evolutions</Link>
        <Link to="/favorite_pokemon">Favorites</Link>
        <Link to="/teams">Teams</Link>
      </nav>

    {/* and if youre home the home page, it has some text as a guide*/}
      {check_location && (
        <div className="nav-description">
          <p>
            Welcome to my website. The links are rather self explanatory, but here is a brief description:
          </p>
          <p>
            “See all final evolutions” displays every fully evolved Pokémon, organized by Pokédex order.
            <br />
            A star next to each Pokémon lets you add or remove it from your favorites.
            <br />
            The “favorite pokemon” page shows all your favorites.
          </p>

          {/*This is to make the page look better. I wanted it to have buttons like a gameboy*/}
          <div className="nav-buttons">
            <div className="nav-button-circle"></div>
            <div className="nav-button-circle"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBoard;
