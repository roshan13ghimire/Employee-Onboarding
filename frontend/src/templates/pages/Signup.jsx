import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";


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


        <div
            className="
                min-h-screen
                bg-[#FAFAF8]
                flex
                items-center
                justify-center
                px-6
                py-10
            "
        >



            <div
                className="
                    w-full
                    max-w-lg
                "
            >





                {/* Branding */}


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








                {/* Signup Card */}


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
                        "
                    >
                        Create Employee Account
                    </h2>



                    <p
                        className="
                            mt-2
                            text-gray-600
                            mb-8
                        "
                    >
                        Enter your employee information to register.
                    </p>







                    <form
                        onSubmit={handleSubmit}
                        className="
                            space-y-5
                        "
                    >





                        <InputField

                            label="Username"

                            name="username"

                            placeholder="Enter username"

                            value={formData.username}

                            onChange={handleChange}

                        />





                        <InputField

                            label="Email Address"

                            name="email"

                            placeholder="Enter email"

                            value={formData.email}

                            onChange={handleChange}

                        />






                        <InputField

                            label="Password"

                            name="password"

                            type="password"

                            placeholder="Create password"

                            value={formData.password}

                            onChange={handleChange}

                        />







                        <div
                            className="
                                grid
                                md:grid-cols-2
                                gap-4
                            "
                        >


                            <InputField

                                label="Employee ID"

                                name="employee_id"

                                placeholder="Employee ID"

                                value={formData.employee_id}

                                onChange={handleChange}

                            />



                            <InputField

                                label="Department"

                                name="department"

                                placeholder="Department"

                                value={formData.department}

                                onChange={handleChange}

                            />


                        </div>







                        <InputField

                            label="Job Title"

                            name="job_title"

                            placeholder="Job title"

                            value={formData.job_title}

                            onChange={handleChange}

                        />








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

                            Create Account

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

                        Already have an account?


                        <Link

                            to="/login"

                            className="
                                ml-2
                                text-[#12304A]
                                font-medium
                                hover:underline
                            "

                        >

                            Login

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

                    For account assistance, contact Human Resources.

                </p>





            </div>



        </div>


    );

}









function InputField({

    label,
    name,
    type="text",
    placeholder,
    value,
    onChange

}) {


    return (

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

                {label}

            </label>



            <input

                type={type}

                name={name}

                value={value}

                onChange={onChange}

                placeholder={placeholder}


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

    );

}



export default Signup;