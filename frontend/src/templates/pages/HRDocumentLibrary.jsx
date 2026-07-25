import { useEffect, useState } from "react";
import api from "../services/api";


function HRDocumentLibrary() {


    const [documents, setDocuments] = useState([]);



    const fetchDocuments = async () => {


        try {


            const response = await api.get(
                "/documents/"
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

                    Document Library

                </h1>


                <p
                    className="
                        text-gray-600
                        mt-2
                    "
                >

                    View all onboarding documents uploaded by HR.

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

                        No documents uploaded yet.

                    </div>

                )



                :



                (

                    <div
                        className="
                            grid
                            md:grid-cols-2
                            gap-6
                        "
                    >


                        {
                            documents.map((doc) => (



                                <div

                                    key={doc.id}

                                    className="
                                        bg-white
                                        border
                                        border-gray-200
                                        rounded-xl
                                        p-6
                                        shadow-sm
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

                                        {doc.title}

                                    </h2>





                                    <div
                                        className="
                                            mt-4
                                            space-y-2
                                            text-gray-700
                                        "
                                    >


                                        <p>

                                            <span className="font-medium">
                                                Category:
                                            </span>

                                            {" "}

                                            {doc.category}

                                        </p>





                                        <p>

                                            <span className="font-medium">
                                                Job Type:
                                            </span>

                                            {" "}

                                            {doc.job_type}

                                        </p>





                                        <p>

                                            <span className="font-medium">
                                                Version:
                                            </span>

                                            {" "}

                                            {doc.version}

                                        </p>



                                    </div>







                                    {
                                        doc.file &&


                                        <a

                                            href={`http://127.0.0.1:8000${doc.file}`}

                                            target="_blank"

                                            rel="noreferrer"


                                            className="
                                                inline-block
                                                mt-5
                                                bg-[#12304A]
                                                text-white
                                                px-5
                                                py-2
                                                rounded-lg
                                                hover:bg-[#0D2438]
                                                transition
                                            "

                                        >

                                            View Document

                                        </a>


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



export default HRDocumentLibrary;