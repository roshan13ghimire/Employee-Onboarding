import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";


function Dashboard() {


    const [documents, setDocuments] = useState([]);
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





    useEffect(() => {

        fetchDocuments();

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





            {/* Welcome */}


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

                    Welcome back

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

                    >

                    </div>


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






                                <p
                                    className="
                                        text-sm
                                        text-gray-500
                                        mt-2
                                    "
                                >

                                    Action:

                                    {" "}

                                    {doc.action_type}

                                </p>







                                <div className="mt-3">


                                    Status:


                                    <StatusBadge

                                        status={doc.status}

                                    />


                                </div>









                                {/* Upload Document */}



                                {
                                    doc.status === "PENDING" &&

                                    doc.action_type === "UPLOAD" &&


                                    <div
                                        className="
                                            mt-5
                                        "
                                    >



                                        <label
                                            className="
                                                block
                                                text-sm
                                                text-gray-600
                                                mb-2
                                            "
                                        >

                                            Upload completed document

                                        </label>




                                        <input

                                            type="file"

                                            onChange={
                                                e =>
                                                uploadDocument(
                                                    doc.id,
                                                    e.target.files[0]
                                                )
                                            }

                                            className="
                                                text-sm
                                            "

                                        />



                                    </div>


                                }









                              {/* View Document */}


{
    doc.document_file &&


    <a

        href={`http://127.0.0.1:8000/${doc.document_file}`}

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
            hover:bg-gray-100
        "

    >

        View Document

    </a>

}




{/* Signature */}



{
    doc.status === "PENDING" &&

    doc.action_type === "SIGNATURE" &&



    <button
    onClick={() => navigate(`/sign-document/${doc.id}`)}

        className="
            block
            mt-4
            bg-[#12304A]
            text-white
            px-5
            py-2
            rounded-lg
            hover:bg-[#0D2438]
        "

    >

        Sign Document

    </button>




}








                                {/* View Only */}



                                {
                                    doc.action_type === "VIEW_ONLY" &&


                                    <button

                                        className="
                                            mt-5
                                            border
                                            border-gray-300
                                            px-5
                                            py-2
                                            rounded-lg
                                        "

                                    >

                                        View Document

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










function InfoCard({

    title,
    value

}) {


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









function StatusBadge({

    status

}) {


    let classes =
        "bg-gray-100 text-gray-700";



    if(status==="PENDING")
    {
        classes =
        "bg-yellow-100 text-yellow-700";
    }



    if(status==="SUBMITTED")
    {
        classes =
        "bg-blue-100 text-blue-700";
    }



    if(status==="APPROVED")
    {
        classes =
        "bg-green-100 text-green-700";
    }



    if(status==="REJECTED")
    {
        classes =
        "bg-red-100 text-red-700";
    }





    return (

        <span

            className={`
                ml-3
                px-3
                py-1
                text-sm
                rounded-full
                ${classes}
            `}

        >

            {status}

        </span>

    );


}





export default Dashboard;