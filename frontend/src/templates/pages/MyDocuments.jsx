import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";


function MyDocuments() {


    const [documents, setDocuments] = useState([]);
    const navigate = useNavigate();
    const [selectedFiles, setSelectedFiles] = useState({});
    const uploadDocument = async (id) => {

    const file = selectedFiles[id];


    if(!file){

        alert("Please select a file");

        return;

    }


    const formData = new FormData();


    formData.append(
        "uploaded_file",
        file
    );


    await api.post(

        `/my-documents/${id}/upload/`,

        formData,

        {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }

    );


    fetchDocuments();

};



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






    return (


        <div className="space-y-8">



            {/* Header */}


            <div>


                <h1
                    className="
                    text-3xl
                    font-bold
                    text-[#12304A]
                    "
                >

                    My Documents

                </h1>



                <p
                    className="
                    text-gray-600
                    mt-2
                    "
                >

                    View and complete your onboarding documents.

                </p>


            </div>









            {
                documents.length === 0 ?


                (

                    <div
                        className="
                        bg-white
                        border
                        rounded-xl
                        p-8
                        text-gray-500
                        "
                    >

                        No documents assigned yet.

                    </div>

                )


                :


                (

                    <div className="space-y-5">


                    {

                        documents.map((doc)=>(



                            <div

                                key={doc.id}

                                className="
                                bg-white
                                border
                                rounded-xl
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



                                        <h2

                                            className="
                                            text-xl
                                            font-semibold
                                            text-[#12304A]
                                            "

                                        >

                                            {doc.document_title}

                                        </h2>





                                        <p

                                            className="
                                            text-gray-600
                                            mt-2
                                            "

                                        >

                                            Action:

                                            {" "}

                                            <span
                                                className="
                                                font-medium
                                                "
                                            >

                                                {doc.action_type}

                                            </span>


                                        </p>






                                        <p

                                            className="
                                            text-gray-600
                                            mt-2
                                            "

                                        >

                                            Status:


                                            <StatusBadge

                                                status={
                                                    doc.status
                                                }

                                            />


                                        </p>






                                        {
                                            doc.submitted_at &&


                                            <p

                                                className="
                                                text-sm
                                                text-gray-500
                                                mt-3
                                                "

                                            >

                                                Submitted:

                                                {" "}

                                                {
                                                    new Date(
                                                        doc.submitted_at
                                                    )
                                                    .toLocaleDateString()
                                                }


                                            </p>


                                        }



                                    </div>









                                    <div className="space-y-3">






                                        {/* VIEW DOCUMENT */}


                                        {
                                            doc.document_file &&


                                            <a

                                                href={
                                                    `http://127.0.0.1:8000${doc.document_file}`
                                                }

                                                target="_blank"

                                                rel="noreferrer"

                                                className="
                                                block
                                                text-center
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









                                    {
doc.status === "PENDING" &&

doc.action_type === "UPLOAD" &&


<div className="mt-5">


<input

    type="file"

    onChange={(e)=>{

        setSelectedFiles({

            ...selectedFiles,

            [doc.id]: e.target.files[0]

        });

    }}


/>



<button

    onClick={() => uploadDocument(doc.id)}

    className="
        mt-3
        bg-[#12304A]
        text-white
        px-5
        py-2
        rounded-lg
    "

>

    Submit Document

</button>


</div>

}



                                        {/* SIGNATURE OPTION */}




                                        {
                                            doc.status === "PENDING"

                                            &&

                                            doc.action_type === "SIGNATURE"



                                            &&



                                            <button 
                                            onClick={() => navigate(`/sign-document/${doc.id}`)}

                                                className="
                                                block
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









                                        {/* VIEW ONLY */}



                                        {
                                            doc.action_type === "VIEW_ONLY"

                                            &&


                                            <button

                                                className="
                                                block
                                                border
                                                px-5
                                                py-2
                                                rounded-lg
                                                "

                                            >

                                                Viewed

                                            </button>


                                        }






                                    </div>





                                </div>







                                {/* Submitted File */}



                                {
                                    doc.uploaded_file &&


                                    <div className="mt-5">


                                        <a

                                            href={
                                                `http://127.0.0.1:8000${doc.uploaded_file}`
                                            }

                                            target="_blank"

                                            rel="noreferrer"

                                            className="
                                            text-blue-600
                                            hover:underline
                                            "

                                        >

                                            View Submitted File

                                        </a>



                                    </div>


                                }






                            </div>



                        ))

                    }



                    </div>


                )


            }





        </div>


    );


}







function StatusBadge({status}) {


    let style =
        "bg-gray-100 text-gray-700";



    if(status==="PENDING"){

        style =
        "bg-yellow-100 text-yellow-700";

    }



    if(status==="SUBMITTED"){

        style =
        "bg-blue-100 text-blue-700";

    }



    if(status==="APPROVED"){

        style =
        "bg-green-100 text-green-700";

    }



    if(status==="REJECTED"){

        style =
        "bg-red-100 text-red-700";

    }





    return (

        <span

            className={`
            ml-2
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



export default MyDocuments;