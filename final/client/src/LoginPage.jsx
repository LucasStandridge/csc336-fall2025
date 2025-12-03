import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ logIn, logged_in }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [show_password, setShowPassword] = useState(false)

  useEffect (() => {
    if(logged_in) navigate("/home"); 
  }, [logged_in])

  async function handleSubmit(e){
    e.preventDefault();
    const ok = await logIn(username,password)
    if (ok) navigate("/home");
  }

  return (
    <div>
      Please log in <br />
      <form onSubmit={handleSubmit}>

        <input
          id="username_input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />

        <input
          id="password_input"
          type={show_password ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => {
              setPassword(e.target.value);}}
        />
        
        <button id="show_password" onClick = {(e) =>{
          e.preventDefault()
          setShowPassword(!show_password)
        }}>{show_password? "Hide Password" : "Show Password"}</button>
        <br />

        <button id="submit_button" type="submit">Submit</button> <br></br>

      </form>
      <p> </p>

      Not a user yet? <br></br>
      <Link to="/createuser">
        <button id="create_user_button">Create a User</button>
      </Link>

    </div>
  );
}