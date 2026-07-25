import { useEffect, useState } from "react";
import api from "../services/api";


function HRDocuments() {


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





    useEffect(() => {


        fetchDocuments();


    }, []);








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








    const totalDocuments = documents.length;



    const pendingDocuments = documents.filter(

        doc =>
        doc.status === "SUBMITTED"

    ).length;




    const approvedDocuments = documents.filter(

        doc =>
        doc.status === "APPROVED"

    ).length;







    return (


        <div
            className="
                space-y-8
            "
        >




            {/* Header */}


            <div>


                <h1
                    className="
                        text-3xl
                        font-bold
                        text-[#12304A]
                    "
                >

                    HR Document Management

                </h1>


                <p
                    className="
                        text-gray-600
                        mt-2
                    "
                >

                    Review employee onboarding documents and manage approvals.

                </p>


            </div>









            {/* Stats */}



            <div
                className="
                    grid
                    md:grid-cols-3
                    gap-6
                "
            >


                <Card

                    title="Total Documents"

                    value={totalDocuments}

                />


                <Card

                    title="Pending Review"

                    value={pendingDocuments}

                />


                <Card

                    title="Approved"

                    value={approvedDocuments}

                />



            </div>









            {/* Documents */}



            <div>


                <h2
                    className="
                        text-xl
                        font-semibold
                        text-[#12304A]
                        mb-5
                    "
                >

                    Employee Submissions

                </h2>






                {

                    documents.length === 0

                    ?

                    <div
                        className="
                            bg-white
                            border
                            p-6
                            text-gray-600
                        "
                    >

                        No employee submissions yet.

                    </div>



                    :


                    <div
                        className="
                            space-y-6
                        "
                    >



                    {

                        documents.map(doc => (


                            <div

                                key={doc.id}

                                className="
                                    bg-white
                                    border
                                    border-gray-200
                                    p-6
                                "

                            >




                                <div
                                    className="
                                        flex
                                        justify-between
                                        items-start
                                    "
                                >


                                    <div>


                                        <h3
                                            className="
                                                text-lg
                                                font-semibold
                                                text-[#12304A]
                                            "
                                        >

                                            {doc.document_title}

                                        </h3>



                                        <p
                                            className="
                                                text-gray-600
                                                mt-2
                                            "
                                        >

                                            Employee:
                                            <span
                                                className="
                                                    ml-2
                                                    font-medium
                                                "
                                            >

                                                {doc.employee_name}

                                            </span>

                                        </p>




                                        <p
                                            className="
                                                text-gray-600
                                            "
                                        >

                                            Department:
                                            {doc.department}

                                        </p>



                                        <p
                                            className="
                                                text-gray-600
                                            "
                                        >

                                            Job Title:
                                            {doc.job_title}

                                        </p>



                                    </div>





                                    <StatusBadge

                                        status={doc.status}

                                    />



                                </div>








                                {
                                    doc.uploaded_file &&


                                    <a

                                        href={
                                            `http://127.0.0.1:8000${doc.uploaded_file}`
                                        }

                                        target="_blank"

                                        rel="noreferrer"


                                        className="
                                            inline-block
                                            mt-5
                                            text-[#12304A]
                                            font-medium
                                            hover:underline
                                        "

                                    >

                                        View Uploaded File

                                    </a>


                                }









                                {

                                    doc.status === "SUBMITTED"

                                    &&


                                    <div
                                        className="
                                            mt-6
                                            flex
                                            gap-3
                                        "
                                    >



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


                }


            </div>



        </div>


    );

}









function Card({title,value}) {


    return (

        <div
            className="
                bg-white
                border
                border-gray-200
                p-6
            "
        >

            <p
                className="
                    text-sm
                    text-gray-500
                "
            >

                {title}

            </p>


            <p
                className="
                    text-3xl
                    font-bold
                    text-[#12304A]
                    mt-2
                "
            >

                {value}

            </p>


        </div>

    );

}








function StatusBadge({status}) {


    let style =
        "bg-gray-100 text-gray-700";



    if(status==="PENDING")
        style =
        "bg-yellow-100 text-yellow-700";



    if(status==="SUBMITTED")
        style =
        "bg-blue-100 text-blue-700";



    if(status==="APPROVED")
        style =
        "bg-green-100 text-green-700";



    if(status==="REJECTED")
        style =
        "bg-red-100 text-red-700";



    return (

        <span
            className={`
                px-3
                py-1
                text-sm
                ${style}
            `}
        >

            {status}

        </span>

    );

}



export default HRDocuments;