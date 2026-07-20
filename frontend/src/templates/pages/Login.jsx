import { useState } from "react";
import api from "../services/api";


function Login(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleLogin = async (e)=>{

        e.preventDefault();

        const response = await api.post(
            "/token/",
            {
                username,
                password
            }
        );


        localStorage.setItem(
    "access",
    response.data.access
);

localStorage.setItem(
    "refresh",
    response.data.refresh
);

console.log("Login successful");

    };


    return (

        <div>

            <h2>
                Login
            </h2>


            <form onSubmit={handleLogin}>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={
                        (e)=>setUsername(e.target.value)
                    }
                />


                <br/>


                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={
                        (e)=>setPassword(e.target.value)
                    }
                />


                <br/>


                <button>
                    Login
                </button>

            </form>

        </div>

    )

}


export default Login;