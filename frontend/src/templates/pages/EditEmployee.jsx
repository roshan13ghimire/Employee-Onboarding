import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";


function EditEmployee() {


    const { id } = useParams();

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    const [formData, setFormData] = useState({

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
const updateEmployee = async (e) => {

    e.preventDefault();


    setLoading(true);


    try {


        await api.put(

            `/employees/${id}/update/`,

            formData

        );


        toast.success(
            "Employee updated successfully."
        );


        setTimeout(() => {

            navigate(
                `/employees/${id}`
            );

        }, 1000);



    } catch(error) {


        console.log(error);


        toast.error(
            "Unable to update employee."
        );


    } finally {


        setLoading(false);


    }

};



    const fetchEmployee = async () => {

        try {

            const response = await api.get(
                `/employees/${id}/`
            );


            setFormData({

                employee_id:
                    response.data.employee_id,

                department:
                    response.data.department,

                job_title:
                    response.data.job_title

            });


        } catch(error) {

            console.log(error);

        }

    };





    useEffect(() => {

        fetchEmployee();

    }, []);





    return (

<div className="space-y-8">


    <div className="
        bg-white
        border
        rounded-xl
        p-8
    ">


        <h1 className="
            text-3xl
            font-bold
            text-[#12304A]
        ">

            Edit Employee

        </h1>




        <form

            onSubmit={updateEmployee}

            className="
                mt-6
                space-y-5
            "

        >



            <div>


                <label className="block mb-2 font-medium">

                    Employee ID

                </label>


                <input

                    name="employee_id"

                    value={formData.employee_id}

                    onChange={handleChange}


                    className="
                        w-full
                        border
                        rounded-lg
                        px-4
                        py-3
                    "

                />


            </div>





            <div>


                <label className="block mb-2 font-medium">

                    Department

                </label>


                <input

                    name="department"

                    value={formData.department}

                    onChange={handleChange}


                    className="
                        w-full
                        border
                        rounded-lg
                        px-4
                        py-3
                    "

                />


            </div>







            <div>


                <label className="block mb-2 font-medium">

                    Job Title

                </label>


                <input

                    name="job_title"

                    value={formData.job_title}

                    onChange={handleChange}


                    className="
                        w-full
                        border
                        rounded-lg
                        px-4
                        py-3
                    "

                />


            </div>







            <button

                type="submit"
                disabled={loading} 

                className="
                    bg-[#12304A]
                    text-white
                    px-6
                    py-3
                    rounded-lg
                "

            >

                {
    loading
    ?
    "Saving..."
    :
    "Save Changes"
}
 
            </button>



        </form>


    </div>


</div>

);
}


export default EditEmployee;