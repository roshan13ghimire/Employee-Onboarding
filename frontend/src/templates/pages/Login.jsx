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



            // Get logged in user details

            const userResponse = await api.get(
                "/profile/"
            );



            const role = userResponse.data.role;



            // Save role for Navbar and Sidebar

            localStorage.setItem(
                "role",
                role
            );





            if(role === "EMPLOYEE") {


                navigate("/dashboard");


            }


            else if(
                role === "HR" ||
                role === "ADMIN"
            ) {


                navigate("/hr-dashboard");


            }



        } catch(error) {


            console.log(error.response);


            alert(
                "Invalid username or password"
            );


        }

    };






    return (


        <div
            className="
                min-h-screen
                bg-[#FAFAF8]
                flex
                items-center
                justify-center
                px-6
            "
        >



            <div
                className="
                    w-full
                    max-w-md
                "
            >




                <div
                    className="
                        text-center
                        mb-8
                    "
                >


                    <h1
                        className="
                            text-3xl
                            font-bold
                            text-[#12304A]
                        "
                    >
                        School Board
                    </h1>



                    <p
                        className="
                            text-gray-500
                            mt-2
                        "
                    >
                        Employee Onboarding Portal
                    </p>


                </div>







                <div
                    className="
                        bg-white
                        border
                        border-gray-200
                        shadow-sm
                        p-8
                    "
                >



                    <h2
                        className="
                            text-2xl
                            font-semibold
                            text-[#12304A]
                            mb-2
                        "
                    >
                        Sign in
                    </h2>



                    <p
                        className="
                            text-gray-600
                            mb-8
                        "
                    >
                        Access your employee account
                    </p>







                    <form
                        onSubmit={handleLogin}
                        className="space-y-5"
                    >




                        <div>


                            <label
                                className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    mb-2
                                "
                            >
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


                                placeholder="Enter username"


                                className="
                                    w-full
                                    border
                                    border-gray-300
                                    px-4
                                    py-3
                                    focus:outline-none
                                    focus:border-[#12304A]
                                "

                            />


                        </div>







                        <div>


                            <label
                                className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    mb-2
                                "
                            >
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


                                placeholder="Enter password"


                                className="
                                    w-full
                                    border
                                    border-gray-300
                                    px-4
                                    py-3
                                    focus:outline-none
                                    focus:border-[#12304A]
                                "

                            />


                        </div>







                        <button

                            className="
                                w-full
                                bg-[#12304A]
                                text-white
                                py-3
                                font-medium
                                hover:bg-[#0D2438]
                                transition
                            "

                        >

                            Login

                        </button>





                    </form>







                    <div
                        className="
                            mt-8
                            border-t
                            pt-5
                            text-center
                            text-sm
                            text-gray-600
                        "
                    >


                        Need an account?


                        <Link

                            to="/signup"

                            className="
                                ml-2
                                text-[#12304A]
                                font-medium
                                hover:underline
                            "

                        >

                            Employee Signup

                        </Link>


                    </div>



                </div>







                <p
                    className="
                        text-center
                        text-sm
                        text-gray-500
                        mt-6
                    "
                >

                    For access issues, please contact Human Resources.

                </p>



            </div>



        </div>


    );

}



export default Login;