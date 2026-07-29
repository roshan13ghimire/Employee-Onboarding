import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";


function Login() {


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);


    const navigate = useNavigate();





    const handleLogin = async (e) => {

        e.preventDefault();


        setLoading(true);


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




            const userResponse = await api.get(
                "/profile/"
            );


            const role = userResponse.data.role;



            localStorage.setItem(
                "role",
                role
            );



            toast.success(
                "Login successful!"
            );



            setTimeout(() => {


                if(role === "EMPLOYEE") {

                    navigate("/dashboard");

                }


                else if(
                    role === "HR" ||
                    role === "ADMIN"
                ) {

                    navigate("/hr-dashboard");

                }


            }, 800);





        }


        catch(error) {


            console.log(error.response);


            toast.error(
                "Invalid username or password"
            );


        }


        finally {

            setLoading(false);

        }


    };







    return (


        <div
            className="
                min-h-screen
                bg-slate-50
                flex
            "
        >




            {/* LEFT SIDE */}


            <div
                className="
                    hidden
                    lg:flex
                    lg:w-1/2
                    bg-blue-900
                    text-white
                    flex-col
                    justify-center
                    px-16
                "
            >


                <h1
                    className="
                        text-5xl
                        font-bold
                        leading-tight
                    "
                >
                    Employee
                    <br/>
                    Onboarding Portal
                </h1>



                <p
                    className="
                        mt-6
                        text-lg
                        text-blue-100
                        max-w-md
                    "
                >

                    A secure digital platform for managing
                    employee onboarding workflows,
                    documents, and HR collaboration.

                </p>





                <div
                    className="
                        mt-10
                        space-y-5
                    "
                >


                    <Feature text="Secure Authentication"/>

                    <Feature text="Document Management"/>

                    <Feature text="HR Workflow Management"/>

                    <Feature text="Employee Progress Tracking"/>


                </div>



            </div>








            {/* RIGHT SIDE */}



            <div
                className="
                    w-full
                    lg:w-1/2
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
                        bg-white
                        rounded-2xl
                        shadow-xl
                        border
                        border-slate-200
                        p-8
                    "
                >




                    <div
                        className="
                            mb-8
                        "
                    >

                        <h2
                            className="
                                text-3xl
                                font-bold
                                text-slate-900
                            "
                        >
                            Welcome Back
                        </h2>



                        <p
                            className="
                                mt-2
                                text-slate-500
                            "
                        >
                            Sign in to access your account
                        </p>


                    </div>








                    <form
                        onSubmit={handleLogin}
                        className="
                            space-y-6
                        "
                    >





                        <div>


                            <label
                                className="
                                    block
                                    text-sm
                                    font-medium
                                    text-slate-700
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
                                    px-4
                                    py-3
                                    rounded-lg
                                    border
                                    border-slate-300
                                    outline-none
                                    focus:ring-2
                                    focus:ring-blue-600
                                "

                                required

                            />


                        </div>










                        <div>


                            <label
                                className="
                                    block
                                    text-sm
                                    font-medium
                                    text-slate-700
                                    mb-2
                                "
                            >

                                Password

                            </label>




                            <div
                                className="
                                    relative
                                "
                            >


                                <input

                                    type={
                                        showPassword
                                        ? "text"
                                        : "password"
                                    }


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
                                        px-4
                                        py-3
                                        rounded-lg
                                        border
                                        border-slate-300
                                        outline-none
                                        focus:ring-2
                                        focus:ring-blue-600
                                        pr-16
                                    "

                                    required

                                />



                                <button

                                    type="button"

                                    onClick={
                                        () =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }


                                    className="
                                        absolute
                                        right-4
                                        top-3
                                        text-sm
                                        text-blue-700
                                    "

                                >

                                    {
                                        showPassword
                                        ? "Hide"
                                        : "Show"
                                    }


                                </button>



                            </div>


                        </div>








                        <button

                            disabled={loading}


                            className="
                                w-full
                                bg-blue-700
                                hover:bg-blue-800
                                text-white
                                py-3
                                rounded-lg
                                font-semibold
                                transition
                                disabled:opacity-50
                            "

                        >


                            {
                                loading
                                ? "Signing in..."
                                : "Sign In"
                            }


                        </button>




                    </form>







                    <div
                        className="
                            mt-8
                            text-center
                            text-sm
                            text-slate-600
                        "
                    >

                        Need an account?


                        <Link

                            to="/signup"

                            className="
                                ml-2
                                text-blue-700
                                font-semibold
                                hover:underline
                            "

                        >

                            Employee Signup

                        </Link>


                    </div>






                </div>




            </div>






        </div>


    );


}






function Feature({text}) {


    return (

        <div
            className="
                flex
                items-center
                gap-3
                text-blue-100
            "
        >

            <span
                className="
                    text-green-300
                    font-bold
                "
            >
                ✓
            </span>


            <span>
                {text}
            </span>


        </div>

    );

}



export default Login;