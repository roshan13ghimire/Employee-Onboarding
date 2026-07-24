import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";


function Signup() {


    const navigate = useNavigate();


    const [formData, setFormData] = useState({

        username: "",
        email: "",
        password: "",
        employee_id: "",
        department: "",
        job_title: ""

    });



    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };



    const handleSubmit = async (e) => {

        e.preventDefault();


        try {


            await api.post(
                "/signup/",
                formData
            );


            alert(
                "Account created successfully"
            );


            navigate("/login");


        } catch(error) {


            console.log(error.response);


            alert(
                "Signup failed"
            );


        }

    };



    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">


            <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">


                <h1 className="text-3xl font-bold text-center text-gray-800">

                    Create Employee Account

                </h1>


                <p className="text-center text-gray-500 mt-2 mb-6">

                    Join the Employee Onboarding Portal

                </p>



                <form 
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >



                    <input

                        name="username"

                        placeholder="Username"

                        onChange={handleChange}

                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"

                    />



                    <input

                        name="email"

                        type="email"

                        placeholder="Email Address"

                        onChange={handleChange}

                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"

                    />



                    <input

                        name="password"

                        type="password"

                        placeholder="Password"

                        onChange={handleChange}

                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"

                    />



                    <input

                        name="employee_id"

                        placeholder="Employee ID"

                        onChange={handleChange}

                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"

                    />



                    <input

                        name="department"

                        placeholder="Department"

                        onChange={handleChange}

                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"

                    />



                    <input

                        name="job_title"

                        placeholder="Job Title"

                        onChange={handleChange}

                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"

                    />



                    <button

                        type="submit"

                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"

                    >

                        Create Account

                    </button>



                </form>




                <div className="text-center mt-6 text-gray-600">


                    Already have an account?


                    <button

                        onClick={() => navigate("/login")}

                        className="ml-2 text-blue-600 hover:underline"

                    >

                        Login

                    </button>


                </div>



            </div>


        </div>

    );

}


export default Signup;