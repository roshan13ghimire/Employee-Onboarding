import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";



function EmployeeManagement() {


    const [employees, setEmployees] = useState([]);

    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    





    const fetchEmployees = async () => {

        try {

            const response = await api.get(
                "/employees/"
            );


            setEmployees(response.data);


        } catch(error) {

            console.log(error);

        }

    };







    useEffect(() => {

        fetchEmployees();

    }, []);








    const filteredEmployees = employees.filter(employee => {


    const searchText = search.toLowerCase();


    return (

        employee.username?.toLowerCase().includes(searchText)

        ||

        employee.employee_id?.toLowerCase().includes(searchText)

        ||

        employee.department?.toLowerCase().includes(searchText)

        ||

        employee.job_title?.toLowerCase().includes(searchText)

    );


});









return (


<div className="space-y-8">





    {/* Header */}


    <div
        className="
            bg-white
            border
            rounded-xl
            p-8
        "
    >


        <h1
            className="
                text-3xl
                font-bold
                text-[#12304A]
            "
        >

            Employee Management

        </h1>



        <p
            className="
                text-gray-500
                mt-2
            "
        >

            View and manage company employees.

        </p>


    </div>









    {/* Search */}


    <div
        className="
            bg-white
            border
            rounded-xl
            p-6
        "
    >


        <input

            type="text"

            placeholder="Search employees..."

            value={search}

            onChange={
                e =>
                setSearch(e.target.value)
            }


            className="
                w-full
                border
                rounded-lg
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-[#12304A]
            "

        />


    </div>









    {/* Employee Cards */}


    <div
        className="
            grid
            md:grid-cols-2
            lg:grid-cols-3
            gap-6
        "
    >



    {

        filteredEmployees.length === 0 ?


        <div
            className="
                bg-white
                border
                rounded-xl
                p-8
                text-gray-500
            "
        >

            No employees found.

        </div>


        :


        filteredEmployees.map(employee => (


            <div

                key={employee.id}

                className="
                    bg-white
                    border
                    rounded-xl
                    p-6
                    hover:shadow-md
                    transition
                "

            >



                <h2
                    className="
                        text-xl
                        font-semibold
                        text-[#12304A]
                    "
                >

                    {employee.username}

                </h2>




                <div
                    className="
                        mt-4
                        space-y-2
                        text-gray-600
                    "
                >


                    <p>

                        <span className="font-medium">
                            Employee ID:
                        </span>

                        {" "}

                        {employee.employee_id}

                    </p>



                    <p>

                        <span className="font-medium">
                            Department:
                        </span>

                        {" "}

                        {employee.department}

                    </p>




                    <p>

                        <span className="font-medium">
                            Position:
                        </span>

                        {" "}

                        {employee.job_title}

                    </p>


                </div>







                <button
                    onClick={() =>
        navigate(`/employees/${employee.id}`)
    }


                    className="
                        mt-5
                        border
                        border-[#12304A]
                        text-[#12304A]
                        px-5
                        py-2
                        rounded-lg
                        hover:bg-gray-100
                    "

                >

                    View Profile

                </button>




            </div>


        ))

    }


    </div>






</div>


);


}



export default EmployeeManagement;