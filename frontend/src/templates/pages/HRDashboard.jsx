import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";


function HRDashboard() {


    const navigate = useNavigate();

    const [documents, setDocuments] = useState([]);



    const fetchDocuments = async () => {

        try {

            const response = await api.get(
                "/hr-documents/"
            );


            setDocuments(response.data);


        } catch(error) {

            console.log(error);

        }

    };



    const updateStatus = async (id, action) => {

        try {

            await api.post(
                `/hr-documents/${id}/status/`,
                {
                    action: action
                }
            );


            fetchDocuments();


        } catch(error) {

            console.log(error);

        }

    };



    useEffect(() => {

        fetchDocuments();

    }, []);



return (

<div className="space-y-8">


    {/* Header */}

    <div className="
        bg-white
        rounded-xl
        border
        p-8
        flex
        justify-between
        items-center
    ">


        <div>

            <h1 className="
                text-3xl
                font-bold
                text-gray-800
            ">
                HR Dashboard
            </h1>


            <p className="
                text-gray-500
                mt-2
            ">
                Manage employee onboarding and document approvals.
            </p>


        </div>




        <button

            onClick={() =>
                navigate("/upload-document")
            }

            className="
                bg-[#12304A]
                text-white
                px-6
                py-3
                rounded-lg
                hover:bg-[#1c4665]
                transition
            "

        >

            + Upload Document

        </button>


    </div>





    {/* Statistics */}


    <div className="
        grid
        md:grid-cols-3
        gap-6
    ">


        <div className="
            bg-white
            border
            rounded-xl
            p-6
        ">

            <p className="text-gray-500">
                Total Submissions
            </p>

            <h2 className="
                text-3xl
                font-bold
                mt-2
            ">
                {documents.length}
            </h2>

        </div>





        <div className="
            bg-white
            border
            rounded-xl
            p-6
        ">

            <p className="text-gray-500">
                Pending Reviews
            </p>


            <h2 className="
                text-3xl
                font-bold
                mt-2
            ">

            {
                documents.filter(
                    doc =>
                    doc.status === "SUBMITTED"
                ).length
            }

            </h2>


        </div>





        <div className="
            bg-white
            border
            rounded-xl
            p-6
        ">

            <p className="text-gray-500">
                Approved
            </p>


            <h2 className="
                text-3xl
                font-bold
                mt-2
            ">

            {
                documents.filter(
                    doc =>
                    doc.status === "APPROVED"
                ).length
            }

            </h2>


        </div>



    </div>






    {/* Documents */}

    <div>


    <h2 className="
        text-xl
        font-semibold
        mb-4
    ">
        Employee Documents
    </h2>



    <div className="space-y-5">


    {
        documents.length === 0 ?


        <div className="
            bg-white
            rounded-xl
            border
            p-8
            text-gray-500
        ">

            No documents assigned yet.

        </div>



        :



        documents.map(doc => (


        <div

        key={doc.id}

        className="
            bg-white
            border
            rounded-xl
            p-6
            hover:shadow-md
            transition
        "

        >



            <div className="
                flex
                justify-between
            ">



            <div>


                <h3 className="
                    text-lg
                    font-semibold
                ">

                    {doc.document_title}

                </h3>


                <p className="text-gray-600 mt-2">

                    Employee:
                    <span className="font-medium ml-2">
                        {doc.employee_name}
                    </span>

                </p>



                <p className="text-gray-600">

                    Department:
                    {doc.department}

                </p>


                <p className="text-gray-600">

                    Position:
                    {doc.job_title}

                </p>



            </div>





            <span className="
                h-fit
                px-3
                py-1
                rounded-full
                text-sm
                bg-blue-100
                text-blue-700
            ">

                {doc.status}

            </span>



            </div>





            {
                doc.uploaded_file &&


                <a

                href={`http://127.0.0.1:8000${doc.uploaded_file}`}

                target="_blank"

                rel="noreferrer"

                className="
                    inline-block
                    mt-5
                    text-blue-600
                    hover:underline
                "

                >

                View Submitted File

                </a>


            }





            {
                doc.status === "SUBMITTED" &&


                <div className="
                    flex
                    gap-3
                    mt-5
                ">


                <button

                onClick={() =>
                    updateStatus(
                        doc.id,
                        "APPROVE"
                    )
                }

                className="
                    bg-green-700
                    text-white
                    px-5
                    py-2
                    rounded-lg
                "

                >

                Approve

                </button>





                <button

                onClick={() =>
                    updateStatus(
                        doc.id,
                        "REJECT"
                    )
                }

                className="
                    bg-red-700
                    text-white
                    px-5
                    py-2
                    rounded-lg
                "

                >

                Reject

                </button>


                </div>


            }



        </div>


        ))


    }


    </div>

    </div>


</div>

);

}


export default HRDashboard;