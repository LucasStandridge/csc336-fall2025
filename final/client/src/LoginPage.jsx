import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage({ logIn, logged_in }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show_password, setShowPassword] = useState(false);
  //navigate is a cool tool that i use a couple of times to move around
  const navigate = useNavigate();

  //When the page is iopen, if your logged in, go to the main page
  useEffect(() => {
    if (logged_in) navigate("/home");
  }, [logged_in]);

  async function handleSubmit(e) {
    e.preventDefault();

    //Wait to see if the login is valid
    const ok = await logIn(username, password);
    //if it is go to the main page
    if (ok) navigate("/home");
  }

  return (

    //Most of this is the same as the createuser page
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type={show_password ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="button"
          className="small-button"
          onClick={(e) => {
            e.preventDefault();
            setShowPassword(!show_password);
          }}
        >
          {show_password ? "Hide Password" : "Show Password"}
        </button>

        <button type="submit">Submit</button>

        {/*But there is also a link to the createuser page. the link wrapping is cool*/}
        <p>Not a user yet?</p>
        <Link to="/createuser">
          <button type="button">Create a User</button>
        </Link>
      </form>
    </div>
  );
}
