import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";


function Dashboard() {


    const [documents, setDocuments] = useState([]);
    const [profile, setProfile] = useState(null);

    const navigate = useNavigate();



    const fetchDocuments = async () => {

        try {

            const response = await api.get(
                "/my-documents/"
            );

            setDocuments(response.data);


        } catch(error) {

            console.log(error);

        }

    };





    const fetchProfile = async () => {

        try {

            const response = await api.get(
                "/profile/"
            );

            setProfile(response.data);


        } catch(error) {

            console.log(error);

        }

    };






    useEffect(() => {

        fetchDocuments();
        fetchProfile();

    }, []);






    const uploadDocument = async (id, file) => {


        const formData = new FormData();


        formData.append(
            "uploaded_file",
            file
        );



        try {


            await api.post(

                `/my-documents/${id}/upload/`,

                formData,

                {
                    headers:{
                        "Content-Type":
                        "multipart/form-data"
                    }
                }

            );


            fetchDocuments();


        } catch(error) {


            console.log(error);

            alert(
                "Upload failed"
            );

        }

    };








    const total = documents.length;



    const submitted = documents.filter(

        doc =>
        doc.status === "SUBMITTED"

    ).length;




    const approved = documents.filter(

        doc =>
        doc.status === "APPROVED"

    ).length;





    const progress = total === 0

        ? 0

        :

        Math.round(
            (approved / total) * 100
        );









    return (


        <div className="space-y-8">





            {/* Welcome Section */}


            <div
                className="
                    bg-white
                    border
                    border-gray-200
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

                    Welcome back, {profile?.username || "Employee"}

                </h1>



                <p
                    className="
                        text-gray-600
                        mt-3
                    "
                >

                    Complete your onboarding tasks and
                    submit required documents before your start date.

                </p>


            </div>







            {/* Employee Profile */}


            <div
                className="
                    bg-white
                    border
                    border-gray-200
                    p-8
                "
            >


                <h2
                    className="
                        text-xl
                        font-semibold
                        text-[#12304A]
                        mb-5
                    "
                >

                    Employee Information

                </h2>



                {

                profile ?


                <div
                    className="
                        grid
                        md:grid-cols-2
                        gap-5
                    "
                >


                    <ProfileItem

                        label="Employee ID"

                        value={profile.employee_id}

                    />


                    <ProfileItem

                        label="Department"

                        value={profile.department}

                    />


                    <ProfileItem

                        label="Job Title"

                        value={profile.job_title}

                    />


                    <ProfileItem

                        label="Email"

                        value={profile.email}

                    />



                </div>


                :


                <p className="text-gray-500">

                    Loading profile...

                </p>


                }



            </div>










            {/* Statistics */}



            <div
                className="
                    grid
                    md:grid-cols-3
                    gap-6
                "
            >



                <InfoCard

                    title="Assigned Documents"

                    value={total}

                />



                <InfoCard

                    title="Submitted"

                    value={submitted}

                />



                <InfoCard

                    title="Approved"

                    value={approved}

                />



            </div>









            {/* Progress */}



            <div
                className="
                    bg-white
                    border
                    border-gray-200
                    p-8
                "
            >


                <div
                    className="
                        flex
                        justify-between
                        mb-3
                    "
                >

                    <h2
                        className="
                            font-semibold
                            text-[#12304A]
                            text-lg
                        "
                    >

                        Onboarding Progress

                    </h2>



                    <span>

                        {progress}%

                    </span>


                </div>




                <div
                    className="
                        w-full
                        bg-gray-200
                        h-3
                    "
                >

                    <div

                        className="
                            bg-[#12304A]
                            h-3
                        "

                        style={{
                            width:`${progress}%`
                        }}

                    />


                </div>


            </div>









            {/* Documents */}

            <div>


                <h2
                    className="
                        text-2xl
                        font-semibold
                        text-[#12304A]
                        mb-5
                    "
                >

                    My Documents

                </h2>




                {
                    documents.length === 0 ?


                    <div
                        className="
                            bg-white
                            border
                            p-6
                            text-gray-600
                        "
                    >

                        No documents assigned yet.

                    </div>


                    :


                    <div
                        className="
                            grid
                            md:grid-cols-2
                            gap-6
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


                            <h3
                                className="
                                    text-lg
                                    font-semibold
                                    text-[#12304A]
                                "
                            >

                                {doc.document_title}

                            </h3>



                            <p className="text-sm text-gray-500 mt-2">

                                Action: {doc.action_type}

                            </p>



                            <div className="mt-3">

                                Status:

                                <StatusBadge

                                    status={doc.status}

                                />

                            </div>





                            {
                                doc.status === "PENDING" &&
                                doc.action_type === "UPLOAD" &&


                                <input

                                    type="file"

                                    onChange={
                                        e =>
                                        uploadDocument(
                                            doc.id,
                                            e.target.files[0]
                                        )
                                    }

                                    className="mt-5"

                                />

                            }





                            {
                                doc.document_file &&


                                <a

                                    href={doc.document_file}

                                    target="_blank"

                                    rel="noreferrer"

                                    className="
                                        inline-block
                                        mt-5
                                        border
                                        border-[#12304A]
                                        text-[#12304A]
                                        px-5
                                        py-2
                                        rounded-lg
                                    "

                                >

                                    View Document

                                </a>

                            }





                            {
                                doc.status === "PENDING" &&
                                doc.action_type === "SIGNATURE" &&


                                <button

                                    onClick={() =>
                                        navigate(
                                            `/sign-document/${doc.id}`
                                        )
                                    }


                                    className="
                                        mt-5
                                        bg-[#12304A]
                                        text-white
                                        px-5
                                        py-2
                                        rounded-lg
                                    "

                                >

                                    Sign Document

                                </button>


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









function ProfileItem({label,value}) {


    return (

        <div>


            <p className="text-sm text-gray-500">

                {label}

            </p>


            <p
                className="
                    font-semibold
                    text-[#12304A]
                "
            >

                {value || "-"}

            </p>


        </div>

    );

}









function InfoCard({title,value}) {


    return (

        <div
            className="
                bg-white
                border
                border-gray-200
                p-6
            "
        >

            <p className="text-sm text-gray-500">

                {title}

            </p>


            <h2
                className="
                    text-3xl
                    font-bold
                    text-[#12304A]
                    mt-2
                "
            >

                {value}

            </h2>


        </div>

    );

}









function StatusBadge({status}) {


    let classes =
        "bg-gray-100 text-gray-700";



    if(status==="PENDING")
        classes =
        "bg-yellow-100 text-yellow-700";



    if(status==="SUBMITTED")
        classes =
        "bg-blue-100 text-blue-700";



    if(status==="APPROVED")
        classes =
        "bg-green-100 text-green-700";



    if(status==="REJECTED")
        classes =
        "bg-red-100 text-red-700";




    return (

        <span

            className={`
                ml-3
                px-3
                py-1
                rounded-full
                text-sm
                ${classes}
            `}

        >

            {status}

        </span>

    );

}


export default Dashboard;