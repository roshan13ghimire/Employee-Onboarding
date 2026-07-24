import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";


function Login() {


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();



    const handleLogin = async (e) => {

        e.preventDefault();


        try {


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



            navigate("/dashboard");



        } catch(error) {


            console.log(error.response);

            alert(
                "Invalid username or password"
            );

        }


    };




    return (

        <div className="
            min-h-screen
            bg-gray-100
            flex
            items-center
            justify-center
            px-5
        ">


            <div className="
                bg-white
                w-full
                max-w-md
                rounded-xl
                shadow-lg
                p-8
            ">


                <h1 className="
                    text-3xl
                    font-bold
                    text-center
                    text-blue-600
                    mb-3
                ">
                    Employee Portal
                </h1>



                <p className="
                    text-center
                    text-gray-600
                    mb-8
                ">
                    Welcome back! Login to continue.
                </p>




                <form
                    onSubmit={handleLogin}
                    className="space-y-5"
                >



                    <div>


                        <label className="
                            block
                            mb-2
                            font-medium
                        ">
                            Username
                        </label>


                        <input

                            type="text"

                            value={username}

                            onChange={
                                e =>
                                setUsername(
                                    e.target.value
                                )
                            }


                            className="
                                w-full
                                border
                                rounded-lg
                                px-4
                                py-3
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-500
                            "

                            placeholder="Enter username"

                        />


                    </div>





                    <div>


                        <label className="
                            block
                            mb-2
                            font-medium
                        ">
                            Password
                        </label>


                        <input

                            type="password"

                            value={password}

                            onChange={
                                e =>
                                setPassword(
                                    e.target.value
                                )
                            }


                            className="
                                w-full
                                border
                                rounded-lg
                                px-4
                                py-3
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-500
                            "

                            placeholder="Enter password"

                        />


                    </div>





                    <button

                        className="
                            w-full
                            bg-blue-600
                            text-white
                            py-3
                            rounded-lg
                            font-semibold
                            hover:bg-blue-700
                        "

                    >

                        Login

                    </button>



                </form>




                <p className="
                    text-center
                    mt-6
                    text-gray-600
                ">

                    Don't have an account?


                    <Link

                        to="/signup"

                        className="
                            text-blue-600
                            ml-2
                            font-semibold
                        "

                    >
                        Sign Up
                    </Link>


                </p>



            </div>



        </div>

    );

}


export default Login;