import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css"; // import the same CSS

//This was like the easiest page to make which i didnt expect for some reason
export default function CreateUser() {
  const [username, createUsername] = useState("");
  const [password, createPassword] = useState("");
  const [show_password, setShowPassword] = useState(false);


  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      //get the information from the Users.json on my backend
      const users_json = await fetch("/api/Users");
      if (!users_json.ok) throw new Error("Couldn't fetch users_json");
      const users_data = await users_json.json();
      //Make a unique id = which is just the next number not used, i guess it should be a random number but it 
      //doesnt really matter
      const new_id = users_data.length;
      //Make a new user with the specified features, everything else is blank
      const new_user = {
        id: new_id + 1,
        username: username,
        password: password,
        favorite_pokemon: [],
        teams: [],
      };

      //add the users to the json
      await fetch(`/api/Users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(new_user),
      });

      //this should be a toastify later
      console.log("User created", new_user);
      //put them into the login page after creation
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="auth-container">
      {/*A form to enter your username. I fell in love with the placeholder specification when i did this*/}
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Create User</h2>
        <input
          type="text"
          placeholder="New Username"
          value={username}
          onChange={(e) => createUsername(e.target.value)}
        />

        {/*A form to enter your password. If the user has clicked show password, it will do that, otherwise
      there is a password feature built in (which i found out after failing to make my own for 45 minutes)*/}
        <input
          type={show_password ? "text" : "password"}
          placeholder="New Password"
          value={password}
          onChange={(e) => createPassword(e.target.value)}
        />

        {/*Button to show the password. when you click it... it shows the password until you click it again*/}
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
      </form>
    </div>
  );
}
