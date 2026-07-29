import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";


function Signup() {


    const navigate = useNavigate();


    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);



    const [formData, setFormData] = useState({

        username: "",
        email: "",
        password: "",
        confirmPassword: "",
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









    const validatePassword = (password) => {


        const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;


        return regex.test(password);


    };









    const handleSubmit = async (e) => {


        e.preventDefault();



        if(
            formData.password !== 
            formData.confirmPassword
        ){

            toast.error(
                "Passwords do not match"
            );

            return;

        }





        if(
            !validatePassword(
                formData.password
            )
        ){

            toast.error(
                "Password must contain uppercase, lowercase, number, special character and minimum 6 characters"
            );

            return;

        }






        setLoading(true);




        try {


            await api.post(

                "/signup/",

                {

                    username:
                    formData.username,


                    email:
                    formData.email,


                    password:
                    formData.password,


                    employee_id:
                    formData.employee_id,


                    department:
                    formData.department,


                    job_title:
                    formData.job_title

                }

            );




            toast.success(
                "Account created successfully"
            );



            setTimeout(() => {

                navigate("/login");

            },1000);





        }

        catch(error){


            console.log(error.response);



            toast.error(

                error.response?.data?.username?.[0]
                ||
                "Signup failed"

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

                    Start Your
                    <br/>
                    Employee Journey

                </h1>





                <p
                    className="
                        mt-6
                        text-lg
                        text-blue-100
                        max-w-md
                    "
                >

                    Create your employee profile
                    and access onboarding documents,
                    tasks, and HR resources securely.

                </p>







                <div
                    className="
                        mt-10
                        space-y-5
                    "
                >


                    <Feature text="Secure employee account"/>

                    <Feature text="Digital onboarding workflow"/>

                    <Feature text="Document management"/>

                    <Feature text="HR collaboration"/>


                </div>



            </div>









            {/* RIGHT SIDE */}





            <div
                className="
                    w-full
                    lg:w-1/2
                    flex
                    justify-center
                    items-center
                    px-6
                    py-10
                "
            >





                <div
                    className="
                        w-full
                        max-w-lg
                        bg-white
                        rounded-2xl
                        shadow-xl
                        border
                        border-slate-200
                        p-8
                    "
                >





                    <h2
                        className="
                            text-3xl
                            font-bold
                            text-slate-900
                        "
                    >

                        Create Account

                    </h2>




                    <p
                        className="
                            mt-2
                            mb-8
                            text-slate-500
                        "
                    >

                        Register as an employee

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

                            type="email"

                            placeholder="Enter email"

                            value={formData.email}

                            onChange={handleChange}

                        />









                        <div>


                            <label className="
                                block
                                text-sm
                                font-medium
                                mb-2
                            ">

                                Password

                            </label>



                            <div className="relative">


                                <input

                                    type={
                                        showPassword
                                        ?
                                        "text"
                                        :
                                        "password"
                                    }


                                    name="password"


                                    value={
                                        formData.password
                                    }


                                    onChange={
                                        handleChange
                                    }


                                    placeholder="Create password"


                                    className="
                                        w-full
                                        border
                                        rounded-lg
                                        px-4
                                        py-3
                                        pr-20
                                        focus:ring-2
                                        focus:ring-blue-600
                                    "

                                />



                                <button

                                    type="button"

                                    onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )}

                                    className="
                                        absolute
                                        right-4
                                        top-3
                                        text-blue-700
                                    "

                                >

                                    {
                                        showPassword
                                        ?
                                        "Hide"
                                        :
                                        "Show"
                                    }

                                </button>


                            </div>





                            <p
                                className="
                                    text-xs
                                    text-slate-500
                                    mt-2
                                "
                            >

                                Minimum 6 characters,
                                one uppercase,
                                one lowercase,
                                one number,
                                one special character.

                            </p>


                        </div>









                        <InputField

                            label="Confirm Password"

                            name="confirmPassword"

                            type="password"

                            placeholder="Confirm password"

                            value={formData.confirmPassword}

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

                            placeholder="Job Title"

                            value={formData.job_title}

                            onChange={handleChange}

                        />









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
                                ?
                                "Creating Account..."
                                :
                                "Create Account"
                            }


                        </button>





                    </form>








                    <p
                        className="
                            mt-8
                            text-center
                            text-sm
                            text-slate-600
                        "
                    >

                        Already have an account?


                        <Link

                            to="/login"

                            className="
                                ml-2
                                text-blue-700
                                font-semibold
                            "

                        >

                            Login

                        </Link>


                    </p>





                </div>




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
                    text-slate-700
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
                    rounded-lg
                    px-4
                    py-3
                    focus:ring-2
                    focus:ring-blue-600
                    outline-none
                "

                required

            />


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

            <span className="text-green-300">
                ✓
            </span>


            {text}


        </div>

    );

}




export default Signup;