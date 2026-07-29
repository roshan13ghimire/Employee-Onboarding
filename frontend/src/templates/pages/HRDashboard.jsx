import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { backendURL } from "../services/api";
import AnalyticsCard from "../components/dashboard/AnalyticsCard";
import { toast } from "react-toastify";


function HRDashboard() {


    const navigate = useNavigate();


    const [documents, setDocuments] = useState([]);

    const [stats, setStats] = useState(null);


    const [selectedDocument, setSelectedDocument] = useState(null);

    const [rejectReason, setRejectReason] = useState("");







    const fetchDashboardStats = async () => {

        try {

            const response = await api.get(
                "/hr/dashboard-stats/"
            );


            setStats(response.data);


        } catch(error) {

            console.log(error);

        }

    };









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









    const updateStatus = async (
        id,
        action,
        reason=""
    ) => {


        try {


            await api.post(

                `/hr-documents/${id}/status/`,

                {
                    action: action,
                    reason: reason
                }

            );



            toast.success(
                "Document status updated"
            );



            fetchDocuments();

            fetchDashboardStats();



        } catch(error) {


            console.log(error);


            toast.error(
                "Unable to update document status"
            );


        }

    };









    useEffect(() => {


        fetchDashboardStats();

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
                    "

                >

                    + Upload Document

                </button>


            </div>









            {/* Analytics Cards */}


            <div className="
                grid
                md:grid-cols-3
                lg:grid-cols-6
                gap-6
            ">


                <AnalyticsCard
                    title="Total Employees"
                    value={stats?.total_employees || 0}
                />


                <AnalyticsCard
                    title="Completed"
                    value={stats?.completed_employees || 0}
                />


                <AnalyticsCard
                    title="In Progress"
                    value={stats?.in_progress_employees || 0}
                />


                <AnalyticsCard
                    title="Not Started"
                    value={stats?.not_started_employees || 0}
                />


                <AnalyticsCard
                    title="Pending Reviews"
                    value={stats?.pending_reviews || 0}
                />


                <AnalyticsCard
                    title="Approved Documents"
                    value={stats?.approved_documents || 0}
                />


            </div>









            {/* Document Reviews */}


            <div>


                <h2 className="
                    text-xl
                    font-semibold
                    mb-4
                ">

                    Document Reviews

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

                        No documents waiting.

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
                                        {" "}
                                        {doc.department}

                                    </p>




                                    <p className="text-gray-600">

                                        Position:
                                        {" "}
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

                                    href={`${backendURL}${doc.uploaded_file}`}

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
                                            setSelectedDocument(
                                                doc.id
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









            {/* Reject Modal */}



            {
                selectedDocument &&


                <div className="
                    fixed
                    inset-0
                    bg-black
                    bg-opacity-40
                    flex
                    items-center
                    justify-center
                    z-50
                ">


                    <div className="
                        bg-white
                        rounded-xl
                        p-6
                        w-full
                        max-w-md
                    ">


                        <h2 className="
                            text-xl
                            font-semibold
                            mb-4
                        ">

                            Reject Document

                        </h2>



                        <textarea

                            value={rejectReason}

                            onChange={
                                e =>
                                setRejectReason(
                                    e.target.value
                                )
                            }


                            placeholder="Enter rejection reason"

                            className="
                                w-full
                                border
                                rounded-lg
                                p-3
                                h-32
                            "

                        />





                        <div className="
                            flex
                            justify-end
                            gap-3
                            mt-5
                        ">



                            <button

                                onClick={() => {

                                    setSelectedDocument(null);

                                    setRejectReason("");

                                }}

                                className="
                                    border
                                    px-4
                                    py-2
                                    rounded-lg
                                "

                            >

                                Cancel

                            </button>





                            <button

                                onClick={() => {


                                    if(!rejectReason.trim()){

                                        toast.error(
                                            "Please enter rejection reason"
                                        );

                                        return;

                                    }



                                    updateStatus(

                                        selectedDocument,

                                        "REJECT",

                                        rejectReason

                                    );



                                    setSelectedDocument(null);

                                    setRejectReason("");


                                }}


                                className="
                                    bg-red-700
                                    text-white
                                    px-4
                                    py-2
                                    rounded-lg
                                "

                            >

                                Confirm Reject

                            </button>



                        </div>



                    </div>


                </div>


            }



        </div>

    );

}


export default HRDashboard;