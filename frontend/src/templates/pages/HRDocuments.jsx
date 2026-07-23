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


            alert(
                `Document ${action}`
            );


            fetchDocuments();


        } catch(error) {

            console.log(error);

        }

    };




    return (

        <div>


            <h1>
                HR Document Review
            </h1>



            {
                documents.map((doc) => (

                    <div key={doc.id}>


                        <h3>
                            {doc.document_title}
                        </h3>


                        <p>
                            Status: {doc.status}
                        </p>



                        {
                            doc.uploaded_file &&

                            <p>

                                <a
                                    href={
                                      `http://127.0.0.1:8000${doc.uploaded_file}`
                                    }

                                    target="_blank"
                                >
                                    View Uploaded File
                                </a>

                            </p>

                        }



                        {
                            doc.status === "SUBMITTED" &&

                            <div>


                                <button

                                    onClick={() =>
                                        updateStatus(
                                            doc.id,
                                            "APPROVE"
                                        )
                                    }

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

                                >
                                    Reject
                                </button>


                            </div>

                        }



                    </div>

                ))
            }



        </div>

    );

}


export default HRDocuments;