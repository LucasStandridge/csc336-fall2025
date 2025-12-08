import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function CreateUser(){
    const [username, createUsername] = useState("")
    const [password, createPassword] = useState("")
    const [show_password, setShowPassword] = useState(false)
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        try{
            const users_json = await fetch("/api/Users");
            if(!users_json.ok) throw new Error("couldnt fetch users_json, probably restart server");
            const users_data = await users_json.json();
            // const new_id = await users_data[users_data.length-1];
            const new_id = await users_data.length
            const new_user = {
                id:new_id + 1,
                username: username,
                password: password,
                favorite_pokemon: [],
                teams:[]
            }

            await fetch(`/api/Users`, {
                method: "POST", 
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(new_user),
            });

            console.log("User created", new_user)
            navigate("/")
        }catch(err){
            console.log(err)
        }
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
            <input 
                id="create_username_text" 
                type="text"
                placeholder="New Username"
                value={username}
                onChange = {(e) => {
                    createUsername(e.target.value)
                }}>
            </input><br></br>

            <input
                id="create_password_text"
                type={show_password? "text" : "password"}
                placeholder="New Password"
                value={password}
                onChange = {(e) => {
                    createPassword(e.target.value)
                }}>

            </input>
                  <button id="show_password" onClick = {(e) =>{
                    e.preventDefault()
                    setShowPassword(!show_password)
                }}>{show_password? "Hide Password" : "Show Password"}</button>
                <br />

            <button id="submit_new_user_button" type="submit">Submit</button>
            </form>
        </div>
    )
}