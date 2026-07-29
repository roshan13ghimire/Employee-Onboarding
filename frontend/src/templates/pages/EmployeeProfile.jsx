import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api, { backendURL } from "../services/api";


function EmployeeProfile() {


    const { id } = useParams();


    const [employee, setEmployee] = useState(null);

    const [documents, setDocuments] = useState([]);
    const [progress, setProgress] = useState(null);

const fetchProgress = async () => {

    try {

        const response = await api.get(
            `/employees/${id}/progress/`
        );


        setProgress(response.data);


    } catch(error) {

        console.log(error);

    }

};



    const fetchEmployee = async () => {

        try {

            const response = await api.get(
                `/employees/${id}/`
            );


            setEmployee(response.data);


        } catch(error) {

            console.log(error);

        }

    };






    const fetchDocuments = async () => {

        try {

            const response = await api.get(
                `/employees/${id}/documents/`
            );


            setDocuments(response.data);


        } catch(error) {

            console.log(error);

        }

    };







    useEffect(() => {


        fetchEmployee();

        fetchDocuments();
        fetchProgress();


    }, []);







    if(!employee) {


        return (

            <div>

                Loading employee profile...

            </div>

        );

    }








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


                <div
                    className="
                        flex
                        items-center
                        gap-5
                    "
                >



                    <div
                        className="
                            w-16
                            h-16
                            rounded-full
                            bg-[#12304A]
                            text-white
                            flex
                            items-center
                            justify-center
                            text-2xl
                            font-bold
                        "
                    >

                        {employee.username
                            .charAt(0)
                            .toUpperCase()
                        }


                    </div>




                    <div>


                        <h1
                            className="
                                text-3xl
                                font-bold
                                text-[#12304A]
                            "
                        >

                            {employee.username}

                        </h1>


                        <p className="text-gray-500">

                            Employee Profile

                        </p>


                    </div>


                </div>


            </div>









            {/* Employee Information */}



            <div
                className="
                    bg-white
                    border
                    rounded-xl
                    p-8
                "
            >


                <h2
                    className="
                        text-xl
                        font-semibold
                        text-[#12304A]
                        mb-6
                    "
                >

                    Employee Information

                </h2>




                <div
                    className="
                        grid
                        md:grid-cols-2
                        gap-5
                    "
                >


                    <InfoCard
                        label="Email"
                        value={employee.email}
                    />


                    <InfoCard
                        label="Role"
                        value={employee.role}
                    />


                    <InfoCard
                        label="Employee ID"
                        value={employee.employee_id}
                    />


                    <InfoCard
                        label="Department"
                        value={employee.department}
                    />


                    <InfoCard
                        label="Job Title"
                        value={employee.job_title}
                    />



                </div>


            </div>









            {/* Documents */}



            <div
                className="
                    bg-white
                    border
                    rounded-xl
                    p-8
                "
            >


                <h2
                    className="
                        text-xl
                        font-semibold
                        text-[#12304A]
                        mb-6
                    "
                >

                    Employee Documents

                </h2>
                {
    progress &&

    <div
        className="
            bg-white
            border
            rounded-xl
            p-8
        "
    >

        <h2
            className="
                text-xl
                font-semibold
                text-[#12304A]
                mb-6
            "
        >

            Onboarding Progress

        </h2>



        <div className="space-y-4">


            <p>
                Completed:

                <span className="font-semibold ml-2">

                    {progress.completed_documents}

                    /

                    {progress.total_documents}

                </span>

            </p>




            <div
                className="
                    w-full
                    bg-gray-200
                    h-3
                    rounded-full
                "
            >

                <div

                    className="
                        bg-[#12304A]
                        h-3
                        rounded-full
                    "

                    style={{
                        width:
                        `${progress.progress}%`
                    }}

                >

                </div>


            </div>





            <div className="flex justify-between">


                <span>
                    {progress.progress}%
                </span>


                <span
                    className="
                    font-semibold
                    text-[#12304A]
                    "
                >

                    {progress.status}

                </span>


            </div>



        </div>


    </div>

}





                {
                    documents.length === 0 ?


                    <p className="text-gray-500">

                        No documents assigned.

                    </p>


                    :


                    <div className="space-y-4">



                    {
                        documents.map(doc => (


                            <div

                                key={doc.id}

                                className="
                                    border
                                    rounded-lg
                                    p-5
                                    flex
                                    justify-between
                                    items-center
                                "

                            >


                                <div>


                                    <h3
                                        className="
                                            font-semibold
                                            text-[#12304A]
                                        "
                                    >

                                        {doc.document_title}

                                    </h3>



                                    <p
                                        className="
                                            text-sm
                                            text-gray-500
                                            mt-1
                                        "
                                    >

                                        Type:
                                        {" "}
                                        {doc.action_type}

                                    </p>


                                </div>





                                <div
                                    className="
                                        text-right
                                    "
                                >


                                    <StatusBadge

                                        status={doc.status}

                                    />





                                    {
                                        doc.uploaded_file &&


                                        <div>

                                            <a

                                                href={
                                                    `${backendURL}${doc.uploaded_file}`
                                                }

                                                target="_blank"

                                                rel="noreferrer"

                                                className="
                                                    block
                                                    mt-3
                                                    text-blue-600
                                                    hover:underline
                                                "

                                            >

                                                View File

                                            </a>


                                        </div>


                                    }


                                </div>



                            </div>


                        ))

                    }


                    </div>


                }


            </div>









        </div>


    );

}








function InfoCard({label,value}) {


    return (

        <div
            className="
                bg-gray-50
                border
                rounded-lg
                p-4
            "
        >

            <p
                className="
                    text-sm
                    text-gray-500
                "
            >

                {label}

            </p>


            <p
                className="
                    font-semibold
                    mt-1
                "
            >

                {value || "N/A"}

            </p>


        </div>

    );

}








function StatusBadge({status}) {


    let style =
        "bg-gray-100 text-gray-700";


    if(status === "PENDING") {

        style =
        "bg-yellow-100 text-yellow-700";

    }


    if(status === "SUBMITTED") {

        style =
        "bg-blue-100 text-blue-700";

    }


    if(status === "APPROVED") {

        style =
        "bg-green-100 text-green-700";

    }


    if(status === "REJECTED") {

        style =
        "bg-red-100 text-red-700";

    }



    return (

        <span

            className={`
                px-3
                py-1
                rounded-full
                text-sm
                ${style}
            `}

        >

            {status}

        </span>

    );


}





export default EmployeeProfile;