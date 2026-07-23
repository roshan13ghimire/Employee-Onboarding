import { useEffect, useState } from "react";
import api from "../services/api";


function HRDashboard() {

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

        <div>

            <h1>
                HR Dashboard
            </h1>


            {
                documents.map((doc) => (

                    <div key={doc.id}>

                        <hr />


                        <h3>
                            Employee: {doc.employee_name}
                        </h3>


                        <p>
                            Department: {doc.department}
                        </p>


                        <p>
                            Job Title: {doc.job_title}
                        </p>


                        <h3>
                            Document: {doc.document_title}
                        </h3>


                        <p>
                            Status: {doc.status}
                        </p>



                        {
                            doc.uploaded_file &&

                            <a
                                href={`http://127.0.0.1:8000${doc.uploaded_file}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Download Document
                            </a>

                        }



                        <br />
                        <br />



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


export default HRDashboard;