import {Link, useLocation, useNavigate} from "react-router-dom";


function NavBoard({setLoggedIn,logged_in}) {
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
            There are buttons next to them that are grey by default. Clicking the button will add that Pokemon to your
            favorites, and the button will change to indicate that a Pokemon is one of your favorites
            <br />
            The “favorite pokemon” page shows all your favorites. 
            <br />
            You can also visit the Teams tab. This will allow you to build a team of pokemon, and they all come
            with a starter Pokemon to get the team kicked off. Feel free to build your team around your randomly
            selected starter, or kick your starter out and build from scratch!
            <br /> 
            I hope you enjoy my website.
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
