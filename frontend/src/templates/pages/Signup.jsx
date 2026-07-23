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

        <div>

            <h1>
                Employee Signup
            </h1>


            <form onSubmit={handleSubmit}>


                <input
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                />


                <input
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />


                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                />


                <input
                    name="employee_id"
                    placeholder="Employee ID"
                    onChange={handleChange}
                />


                <input
                    name="department"
                    placeholder="Department"
                    onChange={handleChange}
                />


                <input
                    name="job_title"
                    placeholder="Job Title"
                    onChange={handleChange}
                />


                <button>
                    Create Account
                </button>


            </form>


        </div>

    );

}


export default Signup;